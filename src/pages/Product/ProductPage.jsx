import { useState, useEffect, useRef, useTransition } from "react";
import getAllProduct from "../../services/getAllProduct.";
import CardList from "../../CardList/CardList";
import Navbar from "../../components/Navbar/Navbar";
import RadioButton from "../../components/RadioButton/RadioButton";
import getAllProductCategories from "../../services/getAllProductCategories";

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  const radioButtonOpts = useRef([
    {
      label: "All",
      value: "all",
    },
  ]);

  const originalProduct = useRef([]);
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function fetchAllProduct() {
      let allProduct = getAllProduct();
      allProduct = allProduct.length > 0 ? allProduct : [];
      // simpan data produk yg belum difilter
      originalProduct.current = allProduct;
      // simpan data produk yg telah difilter
      setProduct(allProduct);
    }
    function fetchCategories() {
      const allCategories = getAllProductCategories();
      const newCategories = allCategories
        .map((cat) => ({ label: cat.name, value: cat.slug }))
        .filter(
          (newCat) =>
            !radioButtonOpts.current.some(
              (existingCat) => existingCat.value === newCat.value
            )
        );
      radioButtonOpts.current = [...radioButtonOpts.current, ...newCategories];
    }
    fetchCategories();
    fetchAllProduct();
  }, []);

  useEffect(() => {
    startTransition(() => {
      const filtered = originalProduct.current.filter((product) => {
        const matchedCategory =
          selectedCategory === "all" ||
          product.categorySlug === selectedCategory;
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        return matchedCategory && matchesSearch;
      });

      return setProduct(filtered);
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // const RadioButtonOpts = [

  //   {
  //     label: 'All',
  //     value: 'all'
  //   },
  //   {
  //     label: 'Shinigami\'s',
  //     value: 'shinigami'
  //   },
  //   {
  //     label: 'Arrancar\'s',
  //     value: 'arrancar'
  //   },
  //   {
  //     label: 'Quicy\'s',
  //     value: 'quincy'
  //   },
  //   {
  //     label: 'Hollow\'s',
  //     value: 'hollow'
  //   }
  // ]

  return (
    <>
      <Navbar onSearchChange={handleSearchChange}></Navbar>
      <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
        <h3 className="font-medium">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          <RadioButton
            options={radioButtonOpts.current}
            defaultValue={"all"}
            onChange={handleCategoryChange}
          />
        </div>
      </div>
      <section className="container px-24 py-4">
        <main className="grid grid-cols-4 gap-4">
          <CardList product={product} isPending={isPending} />
        </main>
      </section>
    </>
  );
}
