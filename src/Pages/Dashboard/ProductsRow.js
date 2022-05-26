import React from 'react';

const ProductsRow = ({product,index,setDeletingProduct}) => {
    const {_id,name,price,max,min,image} = product;
    return (
        <tr className="font-bold">
      <th>{index + 1}</th>
      <td>
        <div className="avatar">
          <div className="w-14 rounded">
            <img src={image} alt="Tailwind-CSS-Avatar-component" />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{max}</td>
      <td>{min}</td>
      <td>
        <label
          onClick={() => setDeletingProduct(product)}
          htmlFor="delete-product"
          className="btn btn-error modal-button"
        >
          Delete
        </label>
      </td>
    </tr>
    );
};

export default ProductsRow;