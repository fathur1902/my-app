import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import formatToIDRCurrency from "../../utils/FormatToIDRCurrency";
import getAllProduct from "../../services/getAllProduct.";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const allProducts = getAllProduct();
    const product = allProducts.find((prod) => prod.slug === slug);
    setProduct(product);
  }, []);

  if (!product) {
    return (
      <>
        <h1 className="flex w-full h-full text-center items-center justify-center text-4xl text-pink-600">
          PRODUCT NOT FOUND.
        </h1>
      </>
    );
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col bg-gray-100 px-24 py-8 gap-[30px] min-h-screen">
        <div className="flex px-24 py-4 gap-[48px] items-center bg-white shadow-md rounded-lg">
          <Link to="/">
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              className="mb-0 text-[30px]"
            />
          </Link>
          <h4 className="text-[30px] font-medium">
            {product.name ?? "No Label"}
          </h4>
        </div>
        <div className="flex gap-[30px] px-24 py-6 bg-white shadow-md rounded-lg">
          <div>
            <img
              src={product.imageUrl ?? product.name ?? "No Name"}
              alt={product.name ?? "No Name"}
              className="block w-[400px] h-[550px] object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-[15px]">
            <span className="text-[30px] font-medium">
              {formatToIDRCurrency(product.price) ?? `Not For Sale`}
            </span>
            {product.stock > 0 ? (
              product.stock <= 5 ? (
                <span className="font-medium text-yellow-500">
                  Available, almost out of stock
                </span>
              ) : (
                <span className="font-medium text-green-500">Available</span>
              )
            ) : (
              <span className="font-medium text-red-500">Out of stock</span>
            )}

            <span className="text-gray-800">
              {product.category ?? "Uncategorized"}
            </span>
            {product.stock > 0 ? (
              <div>
                <Button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 p-4 bg-[#6173E6] text-center hover:bg-[#5969cf] text-white active:bg-[#4956ab]"
                >
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="mb-0 text-white"
                  />
                  <span className="text-white">Add to cart</span>
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 p-4 bg-[#9A9A9A] text-center"
                >
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="mb-0 text-white"
                  />
                  <span className="text-[#F3F3F3]">Add to cart</span>
                </Button>
              </div>
            )}
            <span className="font-medium">Description</span>
            <p className="max-w-[500px]">
              {product.description ?? "No description."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
