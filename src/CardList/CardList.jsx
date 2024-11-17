import PropTypes from "prop-types";
import Card from "../components/Card/card";

export default function CardList({product}){
    return (
        <>
        {
            product.length > 0 ? (
                product.map((prod, index)  => <Card product={prod} index={index} key=
                {prod.id ?? index}/> )
            ) : (
                <>
                <p className="text-center py-4 col-span-4">No Product. </p>
                </>
            )
        }
        </>
    )
}

CardList.PropTypes = {
    product : PropTypes.arrayOf(PropTypes.object).isRequired
}