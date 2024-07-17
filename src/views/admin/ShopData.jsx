import React from "react";
import { Button, Textarea, Label, TextInput } from "flowbite-react";
const ShopData = ({setShopName,setShopAddress,setShopPhone}) => {
  return (
    <>
      <div className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="shopName" value="Your Shop Name" />
          </div>
          <TextInput
            id="shopName"
            type="text"
            placeholder="shop name"
            required
            onChange={(e)=>setShopName(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="shopAddress" value="shopAddress" />
          </div>
          <Textarea
            id="shopAddress"
            type="text"
            placeholder="shopAddress"
            required
            onChange={(e)=>setShopAddress(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="shopPhone" value="Shop Phone Number" />
          </div>
          <TextInput
            id="shopPhone"
            type="number"
            placeholder="shop phone"
            required
            onChange={(e)=>setShopPhone(e.target.value)}
          />
        </div>
       
        <Button type="submit" color='blue' className="mt-3">Submit</Button>
      </div>
    </>
  );
};

export default ShopData;
