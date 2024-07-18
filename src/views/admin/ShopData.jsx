import React from "react";
import { Button, Textarea, Label, TextInput ,Spinner} from "flowbite-react";
import { useAuth } from "../../services/provider/AuthContextProvider";
import { useEffect } from "react";
const ShopData = ({ setShopName, setShopAddress, setShopPhone,shopName ,shopAddress,shopPhone,loading}) => {
  const { profile } = useAuth();
  useEffect(() => {
    if (profile) {
      setShopName(profile.shop_name || '');
      setShopAddress(profile.shop_address || '');
      setShopPhone(profile.shop_phone || '');
    }
  }, [profile]);
  
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
            value={shopName !== undefined ? shopName : ''}
            onChange={(e) => setShopName(e.target.value)}
            required
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
            value={shopAddress !== undefined ? shopAddress : ''}
            required
            onChange={(e) => setShopAddress(e.target.value)}
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
            value={shopPhone !== undefined ? shopPhone : ''}
            required
            onChange={(e) => setShopPhone(e.target.value)}
          />
        </div>
        {loading == true ? (
            <>
              <Button type="submit" color="blue" className="w-full ">
                <Spinner
                  color="info"
                  className="me-2"
                  aria-label="Info spinner example"
                />
                Submit
              </Button>
            </>
          ) : (
            <>
              <Button type="submit" color="blue" className="w-full">
                Submit
              </Button>
            </>
          )}
      </div>
    </>
  );
};

export default ShopData;
