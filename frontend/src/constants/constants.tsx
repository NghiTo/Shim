import { MenuProps } from "antd";
import { RiBook2Line } from "react-icons/ri";
import { IoPieChartOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import {
  FaChartBar,
  FaCheck,
  FaHand,
  FaHandHoldingHeart,
  FaHouse,
  FaLayerGroup,
  FaQuestion,
  FaSchool,
} from "react-icons/fa6";
import { LuFileType2, LuRectangleHorizontal } from "react-icons/lu";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiCategory, BiMath } from "react-icons/bi";
import { MdLabel } from "react-icons/md";

export const titleOptions = [
  { value: "Mr", label: "Mr" },
  { value: "Ms", label: "Ms" },
  { value: "Mrs", label: "Mrs" },
  { value: "Dr", label: "Dr" },
  { value: "Mx", label: "Mx" },
];

export const gradeOptions = [
  { value: "1st", label: "1st" },
  { value: "2nd", label: "2nd" },
  { value: "3rd", label: "3rd" },
  { value: "4th", label: "4th" },
  { value: "5th", label: "5th" },
  { value: "6th", label: "6th" },
  { value: "7th", label: "7th" },
  { value: "8th", label: "8th" },
  { value: "9th", label: "9th" },
  { value: "10th", label: "10th" },
  { value: "11th", label: "11th" },
  { value: "12th", label: "12th" },
];

export const subjectOptions = [
  { value: "Mathematics", label: "Mathematics" },
  { value: "English", label: "English" },
  { value: "Literature", label: "Literature" },
  { value: "History", label: "History" },
  { value: "Geography", label: "Geography" },
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Biology", label: "Biology" },
  { value: "Art", label: "Art" },
  { value: "Music", label: "Music" },
  {
    value: "Information technology",
    label: "Information technology",
  },
  { value: "Physical education", label: "Physical education" },
  { value: "Civic education", label: "Civic education" },
  { value: "German", label: "German" },
  { value: "Japanese", label: "Japanese" },
  { value: "Chinese", label: "Chinese" },
  { value: "Russian", label: "Russian" },
  { value: "French", label: "French" },
  { value: "Korean", label: "Korean" },
];

export const itemsTime: MenuProps["items"] = [
  { label: "5 seconds", key: "5" },
  { label: "10 seconds", key: "10" },
  { label: "20 seconds", key: "20" },
  { label: "30 seconds", key: "30" },
  { label: "45 seconds", key: "45" },
  { label: "1 minute", key: "60" },
  { label: "1.5 minutes", key: "90" },
  { label: "2 minutes", key: "120" },
  { label: "3 minutes", key: "180" },
  { label: "5 minutes", key: "300" },
  { label: "10 minutes", key: "600" },
  { label: "15 minutes", key: "900" },
];

export const itemsPoint: MenuProps["items"] = [
  { label: "1 point", key: "1" },
  { label: "2 points", key: "2" },
  { label: "3 points", key: "3" },
  { label: "4 points", key: "4" },
  { label: "5 points", key: "5" },
  { label: "6 points", key: "6" },
  { label: "7 points", key: "7" },
  { label: "8 points", key: "8" },
  { label: "9 points", key: "9" },
  { label: "10 points", key: "10" },
  { label: "11 points", key: "11" },
  { label: "12 points", key: "12" },
  { label: "13 points", key: "13" },
  { label: "14 points", key: "14" },
  { label: "15 points", key: "15" },
  { label: "16 points", key: "16" },
  { label: "17 points", key: "17" },
  { label: "18 points", key: "18" },
  { label: "19 points", key: "19" },
  { label: "20 points", key: "20" },
];

type MenuItem = {
  key: string;
  icon?: React.ReactNode;
  label: string;
  children?: MenuItem[];
};

export const sideBarItems: MenuItem[] = [
  { key: "1", icon: <FaHouse />, label: "Explore" },
  { key: "2", icon: <RiBook2Line />, label: "Library" },
  { key: "3", icon: <IoPieChartOutline />, label: "Report" },
  { key: "4", icon: <SiGoogleclassroom />, label: "Classes" },
  { key: "5", icon: <FaHandHoldingHeart />, label: "Accommodations" },
  { key: "6", icon: <FaSchool />, label: "Teachers" },
  {
    key: "sub1",
    label: "Help and Resources",
    icon: <FaQuestion />,
    children: [
      { key: "7", label: "Teacher Resources" },
      { key: "8", label: "Teacher wish list" },
      { key: "9", label: "Contact Support" },
      { key: "10", label: "Help Center" },
    ],
  },
];

export const routeMap: { [key: string]: string } = {
  "1": "/teacher",
  "2": "/teacher/library",
  "3": "/teacher/report",
  "4": "/teacher/classes",
  "5": "/teacher/accommodations",
  "6": "/teacher/teachers",
  "7": "/teacher/resources",
  "8": "/teacher/wishlist",
  "9": "/teacher/contact-support",
  "10": "/teacher/help-center",
};

export const questionTypes = [
  { label: "multipleChoice", icon: <FaCheck />, color: "#8854c0" },
  {
    label: "fillInTheBlank",
    icon: <LuRectangleHorizontal />,
    color: "#8854c0",
  },
  { label: "openEnded", icon: <LuFileType2 />, color: "#2d70ae" },
  { label: "poll", icon: <FaChartBar />, color: "#2d70ae" },
  { label: "match", icon: <FaLayerGroup />, color: "#00a06a" },
  { label: "dragAndDrop", icon: <FaHand />, color: "#00a06a" },
  { label: "dropDown", icon: <IoMdArrowDropdown />, color: "#e57c1a" },
  { label: "categorize", icon: <BiCategory />, color: "#e57c1a" },
  { label: "labeling", icon: <MdLabel />, color: "red" },
  { label: "mathResponse", icon: <BiMath />, color: "red" },
];

export const gradeFilters = [
  { value: "1st", text: "1st" },
  { value: "2nd", text: "2nd" },
  { value: "3rd", text: "3rd" },
  { value: "4th", text: "4th" },
  { value: "5th", text: "5th" },
  { value: "6th", text: "6th" },
  { value: "7th", text: "7th" },
  { value: "8th", text: "8th" },
  { value: "9th", text: "9th" },
  { value: "10th", text: "10th" },
  { value: "11th", text: "11th" },
  { value: "12th", text: "12th" },
];

export const subjectFilters = [
  { value: "Mathematics", text: "Mathematics" },
  { value: "English", text: "English" },
  { value: "Literature", text: "Literature" },
  { value: "History", text: "History" },
  { value: "Geography", text: "Geography" },
  { value: "Physics", text: "Physics" },
  { value: "Chemistry", text: "Chemistry" },
  { value: "Biology", text: "Biology" },
  { value: "Art", text: "Art" },
  { value: "Music", text: "Music" },
  {
    value: "Information technology",
    text: "Information technology",
  },
  { value: "Physical education", text: "Physical education" },
  { value: "Civic education", text: "Civic education" },
  { value: "German", text: "German" },
  { value: "Japanese", text: "Japanese" },
  { value: "Chinese", text: "Chinese" },
  { value: "Russian", text: "Russian" },
  { value: "French", text: "French" },
  { value: "Korean", text: "Korean" },
];
