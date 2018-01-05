import React from 'react';

console.clear();

class ProductCategoryRow extends React.Component {
   render() {
      return (
         <tr>
            <th colSpan="2">
               {this.props.category}
            </th>
         </tr>
      );
   }
}

class ProductRow extends React.Component {
   render() {
      let product = this.props.product,
          name = product.stocked ? product.name :
            <span style={{color: 'red'}}>
              {product.name}
            </span>;

      return(
         <tr>
            <td>
               {name}
            </td>
            <td>
               {product.price}
            </td>
         </tr>
      );
   }
}

class ProductTable extends React.Component {
   render() {
      let rows = [], cat = null,
         filterText = this.props.filterText,
         inStockOnly = this.props.inStockOnly;
      console.log(this.props);
      this.props.products.forEach((item) => {
         if (item.name.indexOf(filterText) === -1) {
            return;
         }
         if (inStockOnly && !item.stocked) {
            return;
         }
         if (item.category !== cat) {
            rows.push(<ProductCategoryRow category={item.category} key={item.category} />);
         } else {
            rows.push(<ProductRow product={item} key={item.name} />);
         }
         cat = item.category;
      });
      return (
         <table>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Price</th>
               </tr>
            </thead>
            <tbody>{rows}</tbody>
         </table>
      );
   }
}

class SearchBar extends React.Component {
   constructor(props) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleInStockChange = this.handleInStockChange.bind(this);
   }
  
   handleFilterTextChange(e) {
      this.props.onFilterTextChange(e.target.value);
   }
  
   handleInStockChange(e) {
      this.props.onInStockChange(e.target.checked);
   }
   render() {
      let inStockOnly = this.props.inStockOnly,
         filterText = this.props.filterText;
      return (
         <form>
            <input type="text" placeholder="Search..." value={filterText} onChange={this.handleFilterTextChange} />
            <p>
               <input type="checkbox" checked={inStockOnly} onChange={this.handleInStockChange} />
               {' '}
               Only show products in stock
            </p>
         </form>
      );
   }
}

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         filterText: '',
         inStockOnly: false
      };
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleInStockChange = this.handleInStockChange.bind(this);
   }
   handleFilterTextChange(filterText) {
      this.setState({
         filterText: filterText
      });
   }
   
   handleInStockChange(inStockOnly) {
      this.setState({
         inStockOnly: inStockOnly
      });
   }
   render() {
      return (
         <div className="app">
            <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onFilterTextChange={this.handleFilterTextChange} onInStockChange={this.handleInStockChange} />
            <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
      </div>
      );
   }
}

export default App;