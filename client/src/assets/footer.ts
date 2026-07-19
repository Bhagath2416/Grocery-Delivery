import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
  } from "react-icons/fa6";

  import {
    MapPinIcon,
    PhoneIcon,
    MailIcon,
  } from "lucide-react";
  
  export const footerData = {
    brand: {
      socials: [
        {
          icon: FaFacebookF,
          link: "https://facebook.com",
        },
        {
          icon: FaXTwitter,
          link: "https://x.com",
        },
        {
          icon: FaInstagram,
          link: "https://instagram.com",
        },
      ],
    },
  
    sections: [
      {
        title: "Quick Links",
        links: [
          {
            label: "All Products",
            to: "/products",
          },
          {
            label: "Flash Deals",
            to: "/deals",
          },
          {
            label: "Track Order",
            to: "/track-order",
          },
          {
            label: "Delivery Partner",
            href: "https://delivery.example.com",
          },
        ],
      },
  
      {
        title: "Customer Service",
        links: [
          {
            label: "My Account",
            to: "/account",
          },
          {
            label: "Order History",
            to: "/orders",
          },
          {
            label: "Addresses",
            to: "/addresses",
          },
          {
            label: "Help Center",
            href: "https://help.example.com",
          },
        ],
      },
    ],
    contact: [
        {
          icon: MapPinIcon,
          text: "123 Green Valley Rd, Portland",
        },
        {
          icon: PhoneIcon,
          text: "+1 (111) 123-4567",
        },
        {
          icon: MailIcon,
          text: "hello@example.com",
        },
      ],


      bottom: {
        copyright:
          "© 2026 BhagathKumar. All rights reserved.",
      
        links: [
          {
            label: "Privacy Policy",
            href: "#top",
          },
          {
            label: "Terms of Service",
            href: "#top",
          },
        ],
      },
  };