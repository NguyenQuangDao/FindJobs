import { Button, Card, DatePicker, Form, Input, Select, Upload } from "antd";
import React, { useRef, useState } from "react";
import { useCommonMessage } from "../../shared/CommonMessage";
import { currencyOptions, isValidURL } from "../../utils";
import "../../style/JobForm.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { storage, db, auth } from "../../firebase";
import { doc, setDoc, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const JobForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alertSuccess, alertError } = useCommonMessage();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setIsSubmitting(true);

      // Upload logo công ty
      let logoUrl = "";
      if (values.companyAvatar?.[0]?.originFileObj) {
        const storageRef = ref(
          storage,
          `company-logos/${Date.now()}_${values.companyAvatar[0].name}`
        );
        await uploadBytes(storageRef, values.companyAvatar[0].originFileObj);
        logoUrl = await getDownloadURL(storageRef);
      }

      // Tạo job document
      const jobData = {
        ...values,
        deadline: values.deadline ? values.deadline.toDate() : null,
        companyAvatar: logoUrl,
        createdAt: serverTimestamp(),
        userId: auth.currentUser?.uid,
        applications: [],
        status: "active",
      };

      const docRef = doc(db, "jobs", Date.now().toString());
      await setDoc(docRef, jobData);

      // Cập nhật profile người dùng
      if (auth.currentUser) {
        const userRef = doc(db, "profiles", auth.currentUser.uid);
        await updateDoc(userRef, {
          postedJobs: arrayUnion({
            jobId: docRef.id,
            title: values.jobTitle,
            company: values.companyName,
            createdAt: new Date() 
          })
        });
      }

      alertSuccess("Đăng tin thành công!");
      form.resetFields();
    } catch (error) {
      console.error("Error submitting form:", error);
      alertError(`Đăng tin thất bại.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [skillOptions, setSkillOptions] = useState([]);
  const debounceRef = useRef();

  const fetchSkills = (query) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (!query) {
        setSkillOptions([]);
        return;
      }
      fetch(
        `https://api.apilayer.com/skills?q=${encodeURIComponent(
          query
        )}&count=10`,
        {
          method: "GET",
          headers: {
            apikey: "95eIlIbroVTBqCOMzWPbrqhLW1cA3S16",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          let options = [];
          if (Array.isArray(data) && data.length > 0) {
            options = data.map((skill) => ({
              label: skill,
              value: skill,
            }));
            if (
              !data.some((skill) => skill.toLowerCase() === query.toLowerCase())
            ) {
              options.unshift({ label: query, value: query });
            }
          } else {
            options = [{ label: query, value: query }];
          }
          setSkillOptions(options);
        })
        .catch(() => setSkillOptions([{ label: query, value: query }]));
    }, 300);
  };

  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            transition: "transform 0.3s ease",
            fontSize: "20px",
          }}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft
            style={{
              cursor: "pointer",
              transition: "transform 0.3s ease",
              fontSize: "20px",
            }}
            className="hover:scale-110"
          />
          Quay lại
        </div>
      }
      className="w-full max-w-4xl mx-auto m-5"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Logo công ty"
          name="companyAvatar"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          rules={[
            {
              required: true,
              message: "Vui lòng tải lên logo công ty",
            },
          ]}
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                alertError("Chỉ được phép tải lên file ảnh!");
              }
              // Ngăn không cho Upload tự động gửi lên server
              return isImage ? false : Upload.LIST_IGNORE;
            }}
          >
            <Button>Chọn ảnh</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Tên công ty"
          name="companyName"
          rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
        >
          <Input placeholder="Nhập tên công ty" />
        </Form.Item>
        <Form.Item
          label="Tên công việc"
          name="jobTitle"
          rules={[{ required: true, message: "Vui lòng nhập tên công việc" }]}
        >
          <Input placeholder="Nhập tên công việc" />
        </Form.Item>
        <Form.Item
          label="Website công ty"
          name="companyWebsite"
          initialValue=""
          rules={[
            { 
              type: "url",
              message: "URL không hợp lệ",
              validator: (_, value) => 
                value === '' || isValidURL(value) 
                  ? Promise.resolve() 
                  : Promise.reject()
            }
          ]}
        >
          <Input placeholder="Nhập URL website công ty (không bắt buộc)" />
        </Form.Item>
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Mức lương thấp nhất"
            name="minSalary"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mức lương thấp nhất",
                pattern: new RegExp(/^\d{1,3}(,\d{3})*$/),
              },
            ]}
            style={{ flex: 1 }}
          >
            <Input
              placeholder="VD: 15,000,000"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                const formatted = rawValue.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                );
                form.setFieldsValue({ minSalary: formatted });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Mức lương cao nhất"
            name="maxSalary"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mức lương cao nhất",
                pattern: new RegExp(/^\d{1,3}(,\d{3})*$/),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const minSalary = parseInt(
                    getFieldValue("minSalary")?.replace(/,/g, "") || 0
                  );
                  const maxSalary = parseInt(value?.replace(/,/g, "") || 0);

                  if (!value || minSalary <= maxSalary) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Mức lương cao nhất phải lớn hơn mức lương thấp nhất"
                    )
                  );
                },
              }),
            ]}
            style={{ flex: 1 }}
          >
            <Input
              placeholder="VD: 25,000,000"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                const formatted = rawValue.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                );
                form.setFieldsValue({ maxSalary: formatted });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Đơn vị tiền tệ"
            name="currency"
            initialValue="VND"
            style={{ width: 120 }}
          >
            <Select options={currencyOptions} />
          </Form.Item>
        </div>
        <Form.Item
          label="Địa điểm làm việc"
          name="location"
          rules={[{ required: true, message: "Vui lòng nhập địa điểm" }]}
        >
          <Input placeholder="VD: Hà Nội, Việt Nam" />
        </Form.Item>
        <Form.Item
          label="Kinh nghiệm yêu cầu"
          name="experience"
          rules={[
            { required: true, message: "Vui lòng nhập yêu cầu kinh nghiệm" },
          ]}
        >
          <Input placeholder="VD: 3+ năm" />
        </Form.Item>
        <Form.Item
          label="Hạn nộp hồ sơ"
          name="deadline"
          rules={[{ required: true, message: "Vui lòng nhập hạn nộp hồ sơ" }]}
        >
          <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày" />
        </Form.Item>
        <Form.Item
          label="Số lượng tuyển dụng"
          name="openings"
          rules={[
            {
              required: true,
              integer: true,
              min: 1,
              message: "Số lượng tuyển dụng phải là số nguyên và lớn hơn 0",
            },
          ]}
        >
          <Input type="number" placeholder="VD: 2" />
        </Form.Item>
        <Form.Item
          label="Kỹ năng yêu cầu"
          name="skills"
          // rules={[
          //   {  message: "Vui lòng nhập các kỹ năng yêu cầu" },
          // ]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn kỹ năng"
            style={{ width: "100%" }}
            options={skillOptions}
            showSearch
            filterOption={false}
            onSearch={fetchSkills}
          />
        </Form.Item>
        <Form.Item
          label="Tổng quan công việc"
          name="overview"
          rules={[
            {
              required: true,
              min: 10,
              message: "Tổng quan công việc phải có ít nhất 10 ký tự",
            },
          ]}
        >
          <Input.TextArea placeholder="Mô tả chi tiết về công việc" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Tạo công việc"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default JobForm;
