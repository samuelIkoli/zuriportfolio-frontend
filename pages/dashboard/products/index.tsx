import React, { useEffect, useState } from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import { SearchNormal1 } from 'iconsax-react';
import Button from '@ui/Button';
import ProductCard from '@modules/dashboard/component/products/ProductCard';
import Link from 'next/link';
import Pagination from '@ui/Pagination';
import Loader from '@ui/Loader';
import PaginationBar from '@modules/dashboard/component/order/PaginationBar';
type Product = {
  product_id: any;
  image: any;
  name: any;
  price: any;
  url: any;
};
const Products = () => {
  const [pageSize, setPageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProducts] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const searchProduct = (product: Product[]) => {};

  const fetchProducts = async () => {
    // Fetch the product data from the server
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await fetch('https://zuriportfolio-shop-internal-api.onrender.com/api/products/marketplace');
      const data = await res.json();
      if (Array.isArray(data.data)) {
        return data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const insertProduct = (product: any) => {
    setProducts(product);
  };
  const insertSelectedProduct = (product: any) => {
    setSelectedProduct(product);
  };
  useEffect(() => {
    // Run code if current page change
  }, [currentPage]);
  useEffect(() => {
    const setProducts = async () => {
      const product = await fetchProducts();
      insertProduct(product || []);
    };
    setProducts();
  }, []);
  return (
    <MainLayout showDashboardSidebar={true} activePage="products" showTopbar={true}>
      <div className="max-w-[1240px] mx-auto my-4 px-6">
        <div className="flex md:justify-end my-12 justify-center">
          <Link href="/dashboard/products/add-product">
            <Button className="flex py-3 px-5 gap-4 rounded-2xl text-white-100 items-center bg-brand-green-primary transition after:transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M6.5 12H18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.5 18V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Add New Product</span>
            </Button>
          </Link>
        </div>
        <div className="max-w-[1226px] mx-auto shadow-none md:shadow md:rounded-2xl md:px-[15px] md:py-[13px]">
          <div className="flex gap-5 justify-between mb-[37px]">
            <div
              className="focus-within:outline max-w-full focus-within:outline-black px-[14px] py-[10px] flex gap-2 items-center border border-slate-50 rounded-lg flex-1 min-w-0 "
              style={{
                boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
              }}
            >
              <SearchNormal1 size="16" color="#667085" />
              <input
                className=" bg-transparent font-manropeL font-normal focus-within:outline-none flex-1 text-[1rem] leading-[150%] text-custom-color2"
                placeholder="Search products here..."
              />
            </div>
          </div>
          <div
            className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 relative min-h-[350px]"
            style={{
              filter: `drop-shadow(0px 28px 38px rgba(201, 213, 216, 0.30))`,
            }}
          >
            {loading ? (
              <div className="absolute z-50 inset-0 min-h-[300px]">
                <Loader />
              </div>
            ) : (
              <ProductCard
                product={product}
                fetchProducts={fetchProducts}
                insertProduct={insertProduct}
                insertSelectedProduct={insertSelectedProduct}
                selectedProduct={selectedProduct}
              />
            )}
          </div>
          <div className="flex justify-center my-4">
            {pageSize > 1 && (
              <PaginationBar changeCurrentPage={setCurrentPage} currentPage={currentPage} pageLength={3} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Products;
