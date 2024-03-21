import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useCartInfo from "./use-cart-info";
import { set_shipping } from "@/redux/features/order/orderSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useCart } from "./use-cart";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "@/graphql/mutation/cart";
import { getCookie } from "cookies-next";

const useCheckoutSubmit = () => {
  const [CreateOrder, { loading, error }] = useMutation(CREATE_ORDER);
  const [isProductData, setIsProductData] = useState([]);
  const { cartItems, totalPrice, deleteCartItem } = useCart();
  const totalAmount = totalPrice.toString();
  const cart_products = cartItems;
  const token = getCookie("token");
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const userCookie = getCookie("userInfo");
    const user = userCookie ? JSON.parse(userCookie) : null;
    setUserInfo(user);
  }, []);
  const { shipping_info } = useSelector((state) => state.order);
  const [isLoading, setIsLoading] = useState(false);
  const { total, setTotal } = useCartInfo();
  const [cartTotal, setCartTotal] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountProductType, setDiscountProductType] = useState("");
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [showCard, setShowCard] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "all" });
  const handleShippingCost = (value) => {
    setShippingCost(value);
  };
  const removeFromProduct = async (id) => {
    return await deleteCartItem(id);
  };
  useEffect(() => {
    setValue("firstName", shipping_info.firstName);
    setValue("lastName", shipping_info.lastName);
    setValue("country", shipping_info.country);
    setValue("address", shipping_info.address);
    setValue("city", shipping_info.city);
    setValue("zipCode", shipping_info.zipCode);
    setValue("contactNo", shipping_info.contactNo);
    setValue("email", shipping_info.email || userInfo?.email);
    setValue("orderNote", shipping_info.orderNote);
  }, [userInfo, setValue, shipping_info, router]);
  const setProductData = async () => {
    let newData = cart_products?.map((item) => {
      return {
        title: item?.attributes?.product?.data?.attributes?.title || "",
        title_ar: item?.attributes?.product?.data?.attributes?.title_ar || "",
        description:
          item?.attributes?.product?.data?.attributes?.description || "",
        description_ar:
          item?.attributes?.product?.data?.attributes?.description_ar || "",
        price:
          item?.attributes?.product?.data?.attributes?.price?.toString() || "",
        sku: item?.attributes?.product?.data?.attributes?.sku || "",
        discount: item?.attributes?.product?.data?.attributes?.discount || "",
        productId: item?.attributes?.product?.data?.id || "" || "",
        quantity: item?.attributes?.quantity || "",
        imageUrl:
          item?.attributes?.product?.data?.attributes?.images?.data[0]
            ?.attributes?.url || "",
      };
    });
    setIsProductData(newData);
  };
  const setTotalDiscount = async () => {
    let totalDiscount = 0;
    cart_products.forEach((item) => {
      const discountValue =
        parseInt(item.attributes.product.data.attributes.discount) || 0;
      totalDiscount += discountValue;
    });
    setDiscountAmount(totalDiscount.toString());
  };
  useEffect(() => {
    setProductData();
    setTotalDiscount();
  }, [cart_products]);
  const submitHandler = async (data) => {
    dispatch(set_shipping(data));
    setIsCheckoutSubmit(true);
    let orderInfo = {
      Name: `${data.firstName} ${data.lastName}`,
      phoneNumber: data.contactNo,
      email: data.email,
      address: data.address,
      city: data.city,
      zipCode: data.zipCode,
      country: data.country,
      total: totalAmount,
      discount: discountAmount,
      user: userInfo.id,
      status: "pending",
      products: isProductData,
      detailedStatus: "pending",
      publishedAt: new Date(),
    };
    try {
      setIsLoading(true);
      const response = await CreateOrder({
        variables: {
          data: orderInfo,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      notifySuccess("Order successfully placed!");
      const orderId = response.data.createOrder.data.id;
      if (cart_products && token) {
        for (const cartItem of cart_products) {
          await removeFromProduct(cartItem.id);
        }
      }
      router.push(`/order/${orderId}`);
    } catch (error) {
      notifyError("Failed to place order!");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleShippingCost,
    discountAmount,
    total,
    shippingCost,
    discountPercentage,
    discountProductType,
    isCheckoutSubmit,
    setTotal,
    register,
    setValue,
    errors,
    cardError,
    submitHandler,
    handleSubmit,
    clientSecret,
    setClientSecret,
    cartTotal,
    isCheckoutSubmit,
    showCard,
    setShowCard,
    isLoading,
  };
};

export default useCheckoutSubmit;
