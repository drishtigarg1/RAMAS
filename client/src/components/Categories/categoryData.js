import {
  FiBookOpen,
  FiBriefcase,
  FiFeather,
  FiActivity,
  FiBook,
  FiMonitor,
} from "react-icons/fi";

const categories = [
  {
    id: 1,
    name: "Stationery",
    slug: "stationery",
    icon: FiBookOpen,
    products: "250+ Products",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    name: "Office Supplies",
    slug: "office-supplies",
    icon: FiBriefcase,
    products: "180+ Products",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 3,
    name: "Art & Craft",
    slug: "art-and-craft",
    icon: FiFeather,
    products: "120+ Products",
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: 4,
    name: "Sports",
    slug: "sports",
    icon: FiActivity,
    products: "95+ Products",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 5,
    name: "Books",
    slug: "books",
    icon: FiBook,
    products: "400+ Products",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 6,
    name: "Electronics",
    slug: "electronics",
    icon: FiMonitor,
    products: "75+ Products",
    color: "bg-cyan-100 text-cyan-600",
  },
];

export default categories;