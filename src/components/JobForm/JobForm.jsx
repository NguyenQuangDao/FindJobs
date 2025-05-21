import { Button, Card, DatePicker, Form, Input, Select, Upload } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { useCommonMessage } from "../../shared/CommonMessage";
import { categoryOptions, currencyOptions, isValidURL } from "../../utils";
import "../../style/JobForm.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { storage, db, auth } from "../../firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAppContext } from "../../AppProvider/AppProvider";
import LocationSelector from "../../shared/LocationSelector";

const JobForm = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const { alertSuccess, alertError } = useCommonMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);
  const [workTimeType, setWorkTimeType] = useState("");
  const debounceRef = useRef();
  const [form] = Form.useForm();
  const [companyLogo, setCompanyLogo] = useState(null);

  // Lấy thông tin doanh nghiệp từ profile người dùng
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      if (user) {
        try {
          const docRef = doc(db, "profiles", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const profileData = docSnap.data();

            // Nếu có thông tin doanh nghiệp trong profile, điền vào form
            if (profileData.accountType === "business") {
              // Điền thông tin doanh nghiệp
              form.setFieldsValue({
                companyName: profileData.businessName || "",
                companyWebsite: profileData.website || "",
              });

              // Nếu có avatar/logo doanh nghiệp
              if (profileData.avatar) {
                setCompanyLogo(profileData.avatar);

                // Tạo file list giả cho Upload component
                const fileList = [
                  {
                    uid: "-1",
                    name: "company-logo.png",
                    status: "done",
                    url: profileData.avatar,
                  },
                ];

                form.setFieldsValue({
                  companyAvatar: fileList,
                });
              }
            }
          }
        } catch (error) {
          console.error("Lỗi khi lấy thông tin doanh nghiệp:", error);
        }
      }
    };

    fetchCompanyInfo();
  }, [user, form]);

  const onFinish = async (values) => {
    if (!user) {
      navigate("/login");
      alertError("Vui lòng đăng nhập để tiếp tục!");
      return;
    }
    console.log(values);

    try {
      setIsSubmitting(true);

      // Upload logo doanh nghiệp
      let logoUrl = "";
      if (values.companyAvatar?.[0]?.originFileObj) {
        const storageRef = ref(
          storage,
          `company-logos/${Date.now()}_${values.companyAvatar[0].name}`
        );
        await uploadBytes(storageRef, values.companyAvatar[0].originFileObj);
        logoUrl = await getDownloadURL(storageRef);
      } else if (companyLogo) {
        // Sử dụng logo đã có nếu không upload logo mới
        logoUrl = companyLogo;
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
            createdAt: new Date(),
          }),
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
          name="companyAvatar"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          {companyLogo ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={companyLogo}
                alt="Logo doanh nghiệp"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "contain",
                }}
              />
            </div>
          ) : (
            <Upload
              listType="picture"
              maxCount={1}
              fileList={form.getFieldValue("companyAvatar") || []}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  alertError("Chỉ được phép tải lên file ảnh!");
                }
                return isImage ? false : Upload.LIST_IGNORE;
              }}
            >
              <Button>Chọn ảnh</Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item label="Tên doanh nghiệp" name="companyName">
          {form.getFieldValue("companyName") ? (
            <div
              style={{
                padding: "4px 11px",
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                backgroundColor: "#f5f5f5",
              }}
            >
              {form.getFieldValue("companyName")}
            </div>
          ) : (
            <Input placeholder="Nhập tên doanh nghiệp" />
          )}
        </Form.Item>
        <Form.Item
          label="Website doanh nghiệp"
          name="companyWebsite"
          initialValue=""
          rules={[
            {
              type: "url",
              message: "URL không hợp lệ",
              validator: (_, value) =>
                value === "" || isValidURL(value)
                  ? Promise.resolve()
                  : Promise.reject(),
            },
          ]}
        >
          <Input placeholder="Nhập URL website doanh nghiệp (không bắt buộc)" />
        </Form.Item>
        <Form.Item
          label="Tên công việc"
          name="jobTitle"
          rules={[{ required: true, message: "Vui lòng nhập tên công việc" }]}
        >
          <Input placeholder="Nhập tên công việc" />
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
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Thành phố"
            name="city"
            rules={[{ required: true, message: "Vui lòng chọn thành phố" }]}
            style={{ flex: 1 }}
          >
            <LocationSelector
              disabledDistrict={true}
              className="LocationSelector-Job"
              onChange={(value) => {
                form.setFieldsValue({ city: value });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Địa chỉ chi tiết"
            name="detailedAddress"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ chi tiết" },
            ]}
            style={{ flex: 2, height: "36.5px" }}
          >
            <Input
              placeholder="VD: Số 1, Đường ABC, Quận XYZ"
              style={{ height: "36.5px" }}
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Kinh nghiệm yêu cầu"
          name="experience"
          rules={[
            { required: true, message: "Vui lòng nhập yêu cầu kinh nghiệm" },
            {
              pattern: /^[0-9]+$/,
              message: "Vui lòng chỉ nhập số",
            },
          ]}
        >
          <Input
            type="number"
            min={0}
            placeholder="VD: 3"
            addonAfter="năm"
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
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
          <Input.TextArea
            placeholder="Mô tả chi tiết về công việc"
            style={{ minHeight: 400 }}
          />
        </Form.Item>
        <Form.Item
          label="Danh mục công việc"
          name="category"
          rules={[
            { required: true, message: "Vui lòng chọn danh mục công việc" },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn danh mục công việc"
            options={categoryOptions}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Thời gian làm việc"
          name="workTime"
          rules={[
            { required: true, message: "Vui lòng chọn thời gian làm việc" },
          ]}
        >
          <Select
            placeholder="Chọn thời gian làm việc"
            onChange={(value) => setWorkTimeType(value)}
            options={[
              { label: "Toàn thời gian", value: "fulltime" },
              { label: "Bán thời gian", value: "parttime" },
              { label: "Tùy chọn", value: "option" },
            ]}
            style={{ width: "100%" }}
          />
        </Form.Item>
        {workTimeType === "option" && (
          <Form.Item
            name="customWorkTime"
            rules={[
              { required: true, message: "Vui lòng nhập thời gian làm việc" },
            ]}
          >
            <Input placeholder="Nhập thời gian làm việc tùy chọn" />
          </Form.Item>
        )}
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
