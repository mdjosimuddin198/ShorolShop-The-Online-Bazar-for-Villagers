import {
  FaHome,
  FaBox,
  FaInfoCircle,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" my-6 rounded-2xl py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {/* Brand & Address */}
        <div>
          <h2 className="text-2xl font-bold  flex items-center gap-2 mb-4">
            NovaCart
          </h2>
          <p className="mb-4 leading-relaxed">
            Your trusted partner for premium electronics and lifestyle products.
            Excellence in quality, service, and innovation.
          </p>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> +880 15345-67890
            </p>
            <p className="flex items-center gap-2">
              <AiOutlineMail /> novacart-official@gmail.com
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className=" font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className=" flex items-center gap-2">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link href="/products" className=" flex items-center gap-2">
                <FaBox /> Products
              </Link>
            </li>
            <li>
              <Link href="/about" className=" flex items-center gap-2">
                <FaInfoCircle /> About
              </Link>
            </li>
            <li>
              <Link href="/signup" className=" flex items-center gap-2">
                <FaEnvelope /> Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className=" font-semibold mb-6">Stay Connected</h3>
          <p className="mb-4 leading-relaxed">
            Subscribe to our newsletter for the latest updates, deals, and
            exclusive offers.
          </p>
          <div className="flex flex-col gap-2">
            <Input type="email" placeholder="Please Enter your email" />
            <Button variant="ghost" className=" ">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Legal */}
        {/* <div>
          <h3 className=" font-semibold mb-6">Legal</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/terms" className="">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div> */}
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NovaCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
