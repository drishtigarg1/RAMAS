import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowRight, FiBookOpen, FiBox, FiCheck, FiChevronRight, FiHeart, FiMinus, FiPlus, FiSearch, FiShoppingBag, FiStar, FiTruck, FiZap } from "react-icons/fi";
import Container from "../components/Common/Container";
import products from "../data/products";
import useCart from "../hooks/useCart";
import { useWishlist } from "../context/WishlistContext";

const imageMap = {
  "classmate-long-notebook": "/images/banners/banner1.jpg",
  "doms-geometry-box": "/images/banners/banner2.jpg",
  "camel-sketch-pens": "/images/banners/banner1.jpg",
  "kangaro-stapler": "/images/banners/banner2.jpg",
  "jk-copier-a4-paper": "/images/banners/banner1.jpg",
  "premium-cobra-file": "/images/banners/banner2.jpg",
};
const collections = [
  { title: "Stationery", eyebrow: "Learn, create, organise", copy: "The everyday essentials that keep school, work and ideas moving.", href: "/category/stationery", image: "/images/banners/banner1.jpg", tone: "ink" },
  { title: "Sports", eyebrow: "Play with purpose", copy: "Reliable gear for practice days, match days and everything between.", href: "/category/sports", image: "/images/banners/banner3.jpg", tone: "court" },
];
const quickLinks = [["Notebooks", "/category/notebooks"], ["Writing", "/category/writing"], ["Art & Craft", "/category/art-and-craft"], ["Cricket", "/category/cricket"], ["Badminton", "/category/badminton"], ["Office", "/category/office-supplies"]];

function ProductTile({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wished = isInWishlist(product._id);
  const price = product.discountPrice || product.price;
  const savings = product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;
  const handleAdd = () => { addToCart(product); toast.success(`${product.name} added to bag`); };
  return (
    <article className="product-tile group">
      <div className="product-art">
        <img src={imageMap[product.slug]} alt="" loading="lazy" />
        <span className="product-chip">{savings}% off</span>
        <button type="button" aria-label={`${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist`} onClick={() => toggleWishlist(product)} className={`product-heart ${wished ? "is-liked" : ""}`}><FiHeart /></button>
        <div className="product-art-label">{product.category.replaceAll("-", " ")}</div>
      </div>
      <div className="product-copy">
        <p className="product-brand">{product.brand}</p>
        <Link to={`/product/${product.slug}`} className="product-name">{product.name}</Link>
        <div className="product-rating"><FiStar /> {product.rating} <span>({product.reviews})</span></div>
        <div className="product-bottom"><div><strong>₹{price}</strong><del>₹{product.price}</del></div><button type="button" className="add-button" onClick={handleAdd}>Add <FiPlus /></button></div>
      </div>
    </article>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const displayedProducts = useMemo(() => activeCategory === "All" ? products.slice(0, 4) : products.filter((product) => product.category === activeCategory).slice(0, 4), [activeCategory]);
  return (
    <div className="home-page">
      <section className="home-hero"><Container className="hero-layout"><div className="hero-copy"><p className="kicker"><span /> Your everyday store for study & play</p><h1>Make room for<br /><em>better days.</em></h1><p className="hero-lede">From the first page of a new notebook to the final point of a match, find the things that help you show up ready.</p><div className="hero-actions"><Link to="/products" className="button button-dark">Explore the collection <FiArrowRight /></Link><Link to="/offers" className="button button-quiet">See today&apos;s offers</Link></div><div className="hero-notes"><span><FiCheck /> Curated quality</span><span><FiCheck /> Helpful service</span><span><FiCheck /> Easy delivery</span></div></div><div className="hero-visual"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><img src="/images/banners/banner1.jpg" alt="Stationery and sports essentials from Rama" /><div className="hero-stamp"><FiBox /><span>Everything<br />in one place</span></div><div className="hero-tag"><strong>Since 1998</strong><span>Gorakhpur, UP</span></div></div></Container></section>
      <section className="promise-strip"><Container className="promise-grid"><div><FiTruck /><span><strong>Free delivery</strong> above ₹499</span></div><div><FiCheck /><span><strong>Trusted products</strong> chosen with care</span></div><div><FiZap /><span><strong>Quick dispatch</strong> from our store</span></div><div><FiShoppingBag /><span><strong>Personal help</strong> when you need it</span></div></Container></section>
      <section className="section-shell collection-section"><Container><div className="section-intro"><div><p className="kicker">Two ways to shop</p><h2>Find your <em>flow.</em></h2></div><p>One neighbourhood store, thoughtfully stocked for classrooms, desks, studios and courts.</p></div><div className="collection-grid">{collections.map((collection) => <Link to={collection.href} className={`collection-card ${collection.tone}`} key={collection.title}><img src={collection.image} alt="" /><div className="collection-overlay" /><div className="collection-content"><p>{collection.eyebrow}</p><h3>{collection.title}</h3><span>{collection.copy}</span><b>Shop now <FiArrowRight /></b></div></Link>)}</div></Container></section>
      <section className="quick-section"><Container><div className="quick-label"><FiSearch /> Browse by need</div><div className="quick-links">{quickLinks.map(([label, href]) => <Link key={label} to={href}>{label}<FiChevronRight /></Link>)}</div></Container></section>
      <section className="section-shell product-section"><Container><div className="section-intro product-intro"><div><p className="kicker">A considered edit</p><h2>Good things, <em>ready to go.</em></h2></div><div className="category-tabs"><button className={activeCategory === "All" ? "active" : ""} onClick={() => setActiveCategory("All")}>All picks</button><button className={activeCategory === "school-supplies" ? "active" : ""} onClick={() => setActiveCategory("school-supplies")}>Study desk</button><button className={activeCategory === "office-supplies" ? "active" : ""} onClick={() => setActiveCategory("office-supplies")}>Work desk</button></div></div><div className="product-grid">{displayedProducts.map((product) => <ProductTile key={product._id} product={product} />)}</div><div className="center-link"><Link to="/products" className="text-link">View all products <FiArrowRight /></Link></div></Container></section>
      <section className="story-banner"><Container><div className="story-card"><div><p className="kicker">Rama, in your corner</p><h2>Small details.<br /><em>Big difference.</em></h2><p>We believe the right pen, the right pair of grips or a little help choosing can change how a day feels.</p><Link to="/about" className="button button-light">Our story <FiArrowRight /></Link></div><div className="story-mark"><FiBookOpen /><FiMinus /><FiPlus /><FiStar /></div></div></Container></section>
    </div>
  );
}
