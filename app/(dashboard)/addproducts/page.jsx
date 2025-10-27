"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      _id: crypto.randomUUID().slice(0, 24),
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

    console.log("Product Object:", productData);
    alert("✅ Product data generated! Check console.");
  };

  return (
    <Card className="max-w-4xl mx-auto mt-8 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input name="title" placeholder="Enter product title" required />
            </div>
            <div>
              <Label>Type</Label>
              <Input name="type" placeholder="Enter product type" required />
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Old Price</Label>
              <Input
                type="number"
                name="oldPrice"
                placeholder="Enter old price"
                required
              />
            </div>
            <div>
              <Label>New Price</Label>
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
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Model & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Model</Label>
              <Input name="model" placeholder="Enter model name" required />
            </div>
            <div>
              <Label>Category</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wearables">Wearables</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <Label>Sizes</Label>
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
            <Label>Images</Label>
            <div className="flex gap-2 mt-2">
              <Input id="imageUrl" placeholder="Image URL" />
              <Button
                type="button"
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
                    className="mt-2 w-full"
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
              onClick={() => console.log("Cancelled")}
            >
              Cancel
            </Button>
            <Button type="submit">Save Product</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default addproducts;
