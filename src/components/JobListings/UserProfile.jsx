import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Tooltip } from "antd";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import "../../style/JobListings.css";
import { socialOptions } from "../../utils";

function UserProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    });
    return () => unsubscribe();
  }, []);
  console.log(profile);

  return (
    <div className={"profileContainer"}>
      <section className={"profileCard"}>
        {profile?.avatar ? (
          <img
            src={profile?.avatar || ""}
            className={"profileAvatar"}
            alt="avarta"
          />
        ) : (
          <Avatar size={48} icon={<FontAwesomeIcon icon={faUser} />} />
        )}
        <h2 className={"profileName"}>{profile?.name || "loadding.."}</h2>
        <p className={"profileTitle"}>{profile?.email || "loadding.."}</p>
        <button
          className={"editProfileButton"}
          onClick={() => {
            navigate("/profile");
          }}
        >
          Chỉnh sửa hồ sơ
        </button>
      </section>

      <section className={"profileDetails"}>
        {/* <h3 className={"profileSectionTitle"}>Trạng thái</h3> */}
        {/* <span className={"availabilityBadge"}>🔥 Sẵn sàng làm việc</span> */}
        {profile?.social?.length > 0 && (
          <>
            <h3 className={"profileSectionTitle"}>Mạng xã hội & Liên hệ</h3>
            <div className={"connectCount"}>
              {profile.social.map((item, idx) => {
                // Tìm option phù hợp với item.name
                const option = socialOptions.find(
                  (opt) => opt.value === item.name
                );
                return (
                  <p
                    key={idx}
                    className="connectIcon flex items-center fs-6 cursor-pointer connectIconRow"
                  >
                    <Tooltip title={item.name}>
                      <span className="fs-7">
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {option ? option.label : item.name}
                          </a>
                        ) : (
                          item.name
                        )}
                      </span>
                    </Tooltip>
                  </p>
                );
              })}
            </div>
          </>
        )}
        {profile?.skills?.length > 0 && (
          <>
            <h3 className={"profileSectionTitle"}>Kỹ năng & Chuyên môn</h3>
            <div className="groupSkills">
              <div className={"skillsRow"}>
                {profile.skills.map((skill, idx) => (
                  <span key={idx} className={"skillBadge"}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
        <button
          className={"viewProfileButton"}
          onClick={() => {
            navigate("/profile");
          }}
        >
          Xem hồ sơ
        </button>
      </section>
      {profile?.accountType !== "personal" && (
        <section className={"viewJobForm"}>
          <button
            className="proposalButton"
            onClick={() => {
              navigate("/jobForm");
            }}
          >
            Đăng tin tuyển dụng
          </button>
        </section>
      )}
    </div>
  );
}

export default UserProfile;
