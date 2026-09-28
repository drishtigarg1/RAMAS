const products = [
  {
    _id: "1",
    sku: "CLS-LNB-001",
    slug: "classmate-long-notebook",

    name: "Classmate Long Notebook",

    brand: "Classmate",

    category: "school-supplies",
    subCategory: "notebooks",

    price: 120,
    discountPrice: 95,

    stock: 50,

    rating: 4.8,
    reviews: 156,

    featured: true,
    bestseller: true,
    newArrival: false,

    image: "/images/products/notebook.jpg",

    images: [
      "/images/products/notebook.jpg",
      "/images/products/notebook.jpg",
      "/images/products/notebook.jpg",
    ],

    shortDescription:
      "Premium long notebook with high-quality writing paper.",

    description:
      "Classmate Long Notebook is designed for students and professionals. It features premium quality pages with smooth writing experience and durable binding.",

    specifications: {
      Brand: "Classmate",
      Pages: "172",
      Size: "Long",
      Paper: "70 GSM",
      Binding: "Center Stapled",
      Country: "India",
    },

    tags: ["Notebook", "School", "Classmate"],
  },

  {
    _id: "2",
    sku: "DOM-GEO-001",
    slug: "doms-geometry-box",

    name: "DOMS Geometry Box",

    brand: "DOMS",

    category: "school-supplies",
    subCategory: "geometry",

    price: 250,
    discountPrice: 199,

    stock: 35,

    rating: 4.7,
    reviews: 92,

    featured: true,
    bestseller: true,
    newArrival: false,

    image: "/images/products/geometry.jpg",

    images: [
      "/images/products/geometry.jpg",
      "/images/products/geometry.jpg",
      "/images/products/geometry.jpg",
    ],

    shortDescription:
      "Complete geometry box for school students.",

    description:
      "DOMS Geometry Box contains all essential mathematical instruments made with durable metal for long-lasting use.",

    specifications: {
      Brand: "DOMS",
      Material: "Metal",
      Pieces: "10",
      Color: "Blue",
      Country: "India",
    },

    tags: ["Geometry", "School", "Math"],
  },

  {
    _id: "3",
    sku: "CAM-SP-001",
    slug: "camel-sketch-pens",

    name: "Camel Sketch Pens (12 Shades)",

    brand: "Camel",

    category: "art-craft",
    subCategory: "sketch-pens",

    price: 180,
    discountPrice: 149,

    stock: 45,

    rating: 4.8,
    reviews: 134,

    featured: true,
    bestseller: true,
    newArrival: true,

    image: "/images/products/sketch-pen.jpg",

    images: [
      "/images/products/sketch-pen.jpg",
      "/images/products/sketch-pen.jpg",
      "/images/products/sketch-pen.jpg",
    ],

    shortDescription:
      "Smooth colouring sketch pens for school and art projects.",

    description:
      "Bright and vibrant sketch pens with smooth ink flow suitable for school projects, drawing, and craft work.",

    specifications: {
      Brand: "Camel",
      Shades: "12",
      Ink: "Water Based",
      Tip: "Fine",
      Country: "India",
    },

    tags: ["Sketch Pen", "Art", "Drawing"],
  },

  {
    _id: "4",
    sku: "KAN-STP-001",
    slug: "kangaro-stapler",

    name: "Kangaro Stapler HD-10",

    brand: "Kangaro",

    category: "office-supplies",
    subCategory: "staplers",

    price: 210,
    discountPrice: 179,

    stock: 60,

    rating: 4.9,
    reviews: 188,

    featured: true,
    bestseller: true,
    newArrival: false,

    image: "/images/products/stapler.jpg",

    images: [
      "/images/products/stapler.jpg",
      "/images/products/stapler.jpg",
      "/images/products/stapler.jpg",
    ],

    shortDescription:
      "Heavy-duty stapler for office and school use.",

    description:
      "Premium Kangaro stapler with strong steel body designed for smooth stapling performance.",

    specifications: {
      Brand: "Kangaro",
      Capacity: "20 Sheets",
      Material: "Steel",
      Color: "Black",
      Country: "India",
    },

    tags: ["Stapler", "Office", "School"],
  },

  {
    _id: "5",
    sku: "JK-A4-001",
    slug: "jk-copier-a4-paper",

    name: "JK Copier A4 Paper (500 Sheets)",

    brand: "JK Copier",

    category: "paper-products",
    subCategory: "copier-paper",

    price: 420,
    discountPrice: 389,

    stock: 100,

    rating: 4.8,
    reviews: 312,

    featured: true,
    bestseller: true,
    newArrival: false,

    image: "/images/products/a4-paper.jpg",

    images: [
      "/images/products/a4-paper.jpg",
      "/images/products/a4-paper.jpg",
      "/images/products/a4-paper.jpg",
    ],

    shortDescription:
      "Premium A4 copier paper for printing and photocopying.",

    description:
      "High brightness A4 copier paper suitable for laser printers, inkjet printers and photocopy machines.",

    specifications: {
      Brand: "JK Copier",
      Size: "A4",
      GSM: "75",
      Sheets: "500",
      Color: "White",
    },

    tags: ["A4 Paper", "Printing", "Office"],
  },

  {
    _id: "6",
    sku: "RAM-COB-001",
    slug: "premium-cobra-file",

    name: "Premium Cobra File",

    brand: "Rama",

    category: "files-folders",
    subCategory: "cobra-files",

    price: 95,
    discountPrice: 79,

    stock: 250,

    rating: 4.6,
    reviews: 67,

    featured: true,
    bestseller: false,
    newArrival: true,

    image: "/images/products/cobra-file.jpg",

    images: [
      "/images/products/cobra-file.jpg",
      "/images/products/cobra-file.jpg",
      "/images/products/cobra-file.jpg",
    ],

    shortDescription:
      "Premium quality cobra file for office document storage.",

    description:
      "Strong laminated cobra file suitable for schools, offices, colleges and government departments.",

    specifications: {
      Material: "Laminated Board",
      Size: "A4",
      Color: "Blue",
      Type: "Cobra File",
    },

    tags: ["File", "Office", "Document"],
  },
];

export default products;