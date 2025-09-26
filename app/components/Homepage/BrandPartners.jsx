"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Marquee from "react-fast-marquee";
export default function BrandPartners() {
  const partners = [
    {
      name: "Daraz",
      logo: "https://i.pinimg.com/736x/22/58/38/2258385b29e6d75546d59dde2776558b.jpg",
    },
    {
      name: "Apple",
      logo: "https://i.pinimg.com/736x/42/3b/24/423b246c96f138176e17c9e518f9a302.jpg",
    },
    {
      name: "Samsung",
      logo: "https://i.pinimg.com/1200x/dc/36/c1/dc36c1d02dfe2ec192b7ec6d2289cb2d.jpg",
    },
    {
      name: "Levi’s",
      logo: "https://i.pinimg.com/736x/87/fa/15/87fa15c38ff06ac69582263bbeaad6d5.jpg",
    },
    {
      name: "Amazon",
      logo: "https://i.pinimg.com/736x/09/ac/64/09ac6418962ad0d21280f9e3321e0d01.jpg",
    },
    {
      name: "EBay",
      logo: "https://i.pinimg.com/736x/07/b9/50/07b950f1542535f0ea34ebdec1367c57.jpg",
    },
    {
      name: "Nike",
      logo: "https://i.pinimg.com/1200x/1f/b4/7e/1fb47eae62439eb56c30e9673830d957.jpg",
    },
    {
      name: "Puma",
      logo: "https://i.pinimg.com/736x/ca/09/ea/ca09ea073875beb67057114739740166.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto text-center px-4">
        <p className="text-2xl md:text-3xl  font-semibold text-secondary  tracking-wide">
          Our Partners
        </p>
        <h2 className="text-sm text-gray-900 dark:text-white mt-2">
          We work with the best partners
        </h2>

        <Marquee direction="right" pauseOnHover speed={70} className="mt-10 ">
          {partners.map((partner, index) => (
            <Card
              key={index}
              className="flex items-center m-4 justify-center p-6 shadow-sm hover:shadow-md transition rounded-xl"
            >
              <CardContent className="flex relative items-center h-16 w-32 justify-center p-0">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-cover rounded-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw , 48vw"
                />
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
