import { faDiscord, faFacebook, faGithub, faGitlab, faInstagram, faLinkedin, faPinterest, faReddit, faSnapchat, faTelegram, faThreads, faTiktok, faTwitter, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
export const handleFocus = (field) => {
  const inputElement =
    document.getElementById(`${field}`) ||
    document.querySelector(`[name="${field}"]`);
  if (inputElement) {
    inputElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    if (["INPUT", "SELECT", "TEXTAREA"].includes(inputElement.tagName)) {
      inputElement.focus();
    } else {
      const focusableChild = inputElement.querySelector(
        "input, select, textarea"
      );
      if (focusableChild) focusableChild.focus();
    }
  }
};

export const getImageUrl = async (path) => {
  const imageRef = ref(storage, path); 
  return await getDownloadURL(imageRef);
};

export const socialOptions = [
  { label: <><FontAwesomeIcon icon={faLinkedin} style={{ color: "#0077b5", marginRight: 6 }} />LinkedIn</>, value: "LinkedIn", icon: faLinkedin },
  { label: <><FontAwesomeIcon icon={faGithub} style={{ color: "#333", marginRight: 6 }} />GitHub</>, value: "GitHub", icon: faGithub },
  { label: <><FontAwesomeIcon icon={faFacebook} style={{ color: "#1877f3", marginRight: 6 }} />Facebook</>, value: "Facebook", icon: faFacebook },
  { label: <><FontAwesomeIcon icon={faTwitter} style={{ color: "#1da1f2", marginRight: 6 }} />Twitter</>, value: "Twitter", icon: faTwitter },
  { label: <><FontAwesomeIcon icon={faDiscord} style={{ color: "#5865F2", marginRight: 6 }} />Discord</>, value: "Discord", icon: faDiscord },
  { label: <><FontAwesomeIcon icon={faYoutube} style={{ color: "#FF0000", marginRight: 6 }} />Youtube</>, value: "Youtube", icon: faYoutube },
  { label: <><FontAwesomeIcon icon={faInstagram} style={{ color: "#E1306C", marginRight: 6 }} />Instagram</>, value: "Instagram", icon: faInstagram },
  { label: <><FontAwesomeIcon icon={faTiktok} style={{ color: "#000", marginRight: 6 }} />Tiktok</>, value: "Tiktok", icon: faTiktok },
  { label: <><FontAwesomeIcon icon={faGitlab} style={{ color: "#FC6D26", marginRight: 6 }} />Gitlab</>, value: "Gitlab", icon: faGitlab },
  { label: <><FontAwesomeIcon icon={faTelegram} style={{ color: "#229ED9", marginRight: 6 }} />Telegram</>, value: "Telegram", icon: faTelegram },
  { label: <><FontAwesomeIcon icon={faPinterest} style={{ color: "#E60023", marginRight: 6 }} />Pinterest</>, value: "Pinterest", icon: faPinterest },
  { label: <><FontAwesomeIcon icon={faXTwitter} style={{ color: "#000", marginRight: 6 }} />X</>, value: "X", icon: faXTwitter },
  { label: <><FontAwesomeIcon icon={faSnapchat} style={{ color: "#FFFC00", marginRight: 6 }} />Snapchat</>, value: "Snapchat", icon: faSnapchat },
  { label: <><FontAwesomeIcon icon={faThreads} style={{ color: "#000", marginRight: 6 }} />Threads</>, value: "Threads", icon: faThreads },
  { label: <><FontAwesomeIcon icon={faReddit} style={{ color: "#FF4500", marginRight: 6 }} />Reddit</>, value: "Reddit", icon: faReddit },
];

export const currencyOptions = [
  { value: "VND", label: "VND" },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'JPY', label: 'JPY' },
  { value: 'GBP', label: 'GBP' },
  { value: 'AUD', label: 'AUD' },
  { value: 'CAD', label: 'CAD' },
  { value: 'CHF', label: 'CHF' },
  { value: 'CNY', label: 'CNY' },
  { value: 'HKD', label: 'HKD' },
  { value: 'NZD', label: 'NZD' },
  { value: 'SEK', label: 'SEK' },
  { value: 'KRW', label: 'KRW' },
  { value: 'SGD', label: 'SGD' },
  { value: 'NOK', label: 'NOK' },
  { value: 'MXN', label: 'MXN' },
  { value: 'INR', label: 'INR' },
  { value: 'RUB', label: 'RUB' },
  { value: 'ZAR', label: 'ZAR' },
  { value: 'TRY', label: 'TRY' },
  { value: 'BRL', label: 'BRL' },
  { value: 'TWD', label: 'TWD' },
  { value: 'DKK', label: 'DKK' },
  { value: 'PLN', label: 'PLN' },
  { value: 'THB', label: 'THB' },
  { value: 'IDR', label: 'IDR' },
  { value: 'HUF', label: 'HUF' },
  { value: 'CZK', label: 'CZK' },
  { value: 'ILS', label: 'ILS' },
  { value: 'CLP', label: 'CLP' },
  { value: 'PHP', label: 'PHP' }
];

export const isValidURL = (str) => {
  try {
    new URL(str);
    return true;
  } catch (err) {
    console.log(err);
    
  }
};


export const categoryOptions = [
  { label: "Design", value: "design" },
  { label: "Sales", value: "sales" },
  { label: "Finance", value: "finance" },
  { label: "Technology", value: "technology" },
  { label: "Engineering", value: "engineering" },
  { label: "Bussiness", value: "bussiness" },
  { label: "Human Resources", value: "human_resources" }
];