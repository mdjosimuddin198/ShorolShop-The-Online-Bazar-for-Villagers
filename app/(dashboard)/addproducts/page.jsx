"use client";
import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import axios from "axios";

const addproducts = () => {
  const [sizes, setSizes] = useState(new Set());
  const [images, setImages] = useState([]);

  const toggleSize = (size) => {
    const newSizes = new Set(sizes);
    newSizes.has(size) ? newSizes.delete(size) : newSizes.add(size);
    setSizes(newSizes);
  };

  const handleAddImage = (url) => {
    if (url.trim()) {
      setImages([...images, url.trim()]);
      document.getElementById("imageUrl").value = "";
    }
  };

  const handleRemoveImage = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title: e.target.title.value,
      oldPrice: Number(e.target.oldPrice.value),
      newPrice: Number(e.target.newPrice.value),
      description: e.target.description.value,
      type: e.target.type.value,
      model: e.target.model.value,
      category: e.target.category.value,
      sizes: Array.from(sizes),
      images,
      reviews: [], // future: reviews will be added separately
    };

    axios
      .post("/api/products", productData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("product add sucsessfully ");
        }
      })
      .catch((err) => {
        toast.error(err);
      });

    console.log("Product Object:", productData);
  };

  return (
    <Card className="max-w-4xl outlinnon mx-auto mt-8 ">
      <CardTitle className="text-center text-3xl text-secondary">
        Add Products
      </CardTitle>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title & Type */}
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <Label className="p-2">Title</Label>
              <Input name="title" placeholder="Enter product title" required />
            </div>
            <div>
              <Label className="p-2">Type</Label>
              <Input name="type" placeholder="Enter product type" required />
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="p-2">Old Price</Label>
              <Input
                type="number"
                name="oldPrice"
                placeholder="Enter old price"
                required
              />
            </div>
            <div>
              <Label className="p-2">New Price</Label>
              <Input
                type="number"
                name="newPrice"
                placeholder="Enter new price"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label className="p-2">Description</Label>
            <Textarea
              name="description"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Model & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="p-2">Model</Label>
              <Input name="model" placeholder="Enter model name" required />
            </div>
            <div>
              <Label className="p-2">Category</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="text-black">
                  <SelectItem value="Wearables">Wearables</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                  <SelectItem value="Cameras">Cameras</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Monitors">Monitors</SelectItem>
                  <SelectItem value="Smart Home">Smart Home</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <Label className="p-2">Sizes</Label>
            <div className="flex gap-4 mt-2">
              {["S", "M", "L", "XL"].map((s) => (
                <label key={s} className="flex items-center gap-2">
                  <Checkbox
                    checked={sizes.has(s)}
                    onCheckedChange={() => toggleSize(s)}
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <Label className="p-2">Images</Label>
            <div className="flex gap-2 mt-2">
              <Input id="imageUrl" placeholder="Image URL" />
              <Button
                type="button"
                className="cursor-pointer"
                onClick={() =>
                  handleAddImage(document.getElementById("imageUrl").value)
                }
              >
                Add Image
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3">
              {images.map((src, idx) => (
                <div key={idx} className="border rounded p-2">
                  <img
                    src={src}
                    alt={`img-${idx}`}
                    className="w-full h-28 object-cover rounded"
                  />
                  <Button
                    type="button"
                    className="mt-2 w-full cursor-pointer"
                    variant="destructive"
                    onClick={() => handleRemoveImage(idx)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => toast.warn("Cancelled")}
            >
              Cancel
            </Button>
            <Button className="cursor-pointer" type="submit">
              Save Product
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default addproducts;
