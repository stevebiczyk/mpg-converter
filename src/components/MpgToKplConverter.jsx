import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MpgToKplConverter = () => {
  const [mpg, setMpg] = useState("");

  // Conversion constants
  const GALLONS_TO_LITERS = 4.54609188;
  const MILES_TO_KM = 1.609344;

  // Calculate KPL from MPG
  const calculateKpl = (mpgValue) => {
    if (!mpgValue || isNaN(mpgValue)) return "";

    // Formula: MPG * (km/mile) / (L/gallon)
    const kpl = (mpgValue * MILES_TO_KM) / GALLONS_TO_LITERS;
    return kpl.toFixed(2);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMpg(value);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>MPG to KPL Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mpg">Miles per Imperial Gallon (MPG)</Label>
            <Input
              id="mpg"
              type="number"
              value={mpg}
              onChange={handleInputChange}
              placeholder="Enter MPG value"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Kilometers per Liter (KPL)</Label>
            <div className="p-2 bg-gray-100 rounded-md text-lg font-medium">
              {calculateKpl(mpg) || "0.00"} KPL
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MpgToKplConverter;
