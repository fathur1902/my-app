import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import Button from "../Button/Button"
import PropTypes from "prop-types"
import formatToIDRCurrency from "../../utils/FormatToIDRCurrency"
import { Link } from "react-router-dom"

export default function Card({ product }) {
  return (
    <Link
      to={`/product/${product.slug}` ?? ''}
      className="flex flex-col max-w-[370px] flex-wrap p-[16px] bg-[#081116] hover:ring-opacity-40 active:ring-5 active:ring-[#6247eb] hover:ring-4 active:ring-2 active:ring-opacity-90 rounded-lg"
    >
      <div className="flex flex-col p-[14px] bg-[#081116] h-[450px] rounded-lg overflow-hidden">
        <div className="w-full h-[300px] overflow-hidden">
          <img
            src={product.imageUrl ?? ''}
            alt={product.name ?? 'No name'}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 mt-4">
          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-[20px] text-white h-[60px] overflow-hidden">
              {product.name ?? 'No Name'}
            </h4>
            <span className="block font-medium text-[14px] text-[#eaeaea] h-[20px]">
              {product.category ?? 'Uncategorized'}
            </span>
            <span className="block font-medium text-[20px] text-white h-[24px]">
              {formatToIDRCurrency(product.price) ?? 'Not for sale'}
            </span>
          </div>
          <div className="mt-4">
            {product.stock <= 0 ? (
              <p className="text-xl font-semibold text-center text-red-500">
                Out of Stock
              </p>
            ) : product.stock <= 5 && product.stock !== 0 ? (
              <>
                <p className="text-xl font-semibold text-center text-yellow-500 mb-2">
                  Almost Sold Out
                </p>
                <Button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 p-4 bg-[#6173E6] text-center hover:bg-[#5969cf] text-white active:bg-[#4956ab]"
                >
                  <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                  <span>Add to cart</span>
                </Button>
              </>
            ) : (
              <Button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 p-4 bg-[#6173E6] text-center hover:bg-[#5969cf] text-white active:bg-[#4956ab]"
              >
                <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                <span>Add to cart</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}


Card.propTypes = {
    product : PropTypes.object
}