import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const FuelConsumptionConverter = () => {
  const [value, setValue] = useState("");
  const [inputUnit, setInputUnit] = useState("impmpg");

  // Conversion constants
  const IMPERIAL_GALLON_TO_LITERS = 4.54609188;
  const US_GALLON_TO_LITERS = 3.78541178;
  const MILES_TO_KM = 1.609344;

  const calculateAllConversions = (inputValue, fromUnit) => {
    if (!inputValue || isNaN(inputValue)) {
      return {
        impmpg: "0.00",
        usmpg: "0.00",
        kpl: "0.00",
        lper100km: "0.00",
        mpl: "0.00",
        kmpig: "0.00",
        kmpusg: "0.00",
      };
    }

    // First convert to KPL as our base unit
    let kpl;
    switch (fromUnit) {
      case "impmpg":
        kpl = (inputValue * MILES_TO_KM) / IMPERIAL_GALLON_TO_LITERS;
        break;
      case "usmpg":
        kpl = (inputValue * MILES_TO_KM) / US_GALLON_TO_LITERS;
        break;
      case "kpl":
        kpl = inputValue;
        break;
      case "lper100km":
        kpl = 100 / inputValue;
        break;
      case "mpl":
        kpl = inputValue * MILES_TO_KM;
        break;
      default:
        kpl = 0;
    }

    // Then convert KPL to all other units
    return {
      impmpg: ((kpl * IMPERIAL_GALLON_TO_LITERS) / MILES_TO_KM).toFixed(2),
      usmpg: ((kpl * US_GALLON_TO_LITERS) / MILES_TO_KM).toFixed(2),
      kpl: kpl.toFixed(2),
      lper100km: (100 / kpl).toFixed(2),
      mpl: (kpl / MILES_TO_KM).toFixed(2),
      kmpig: (kpl * IMPERIAL_GALLON_TO_LITERS).toFixed(2),
      kmpusg: (kpl * US_GALLON_TO_LITERS).toFixed(2),
    };
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const results = calculateAllConversions(value, inputUnit);

  const handleReset = () => {
    setValue("");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          Fuel Consumption Converter
          <Button variant="outline" size="icon" onClick={handleReset}></Button>
          <RotateCcw className="h-4 w-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mpg">Miles per Imperial Gallon (MPG)</Label>
            <Input
              id="mpg"
              type="number"
              value={value}
              onChange={handleInputChange}
              placeholder="Enter MPG value"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Kilometers per Liter (KPL)</Label>
            <div className="p-2 bg-slate-100 rounded-md text-lg font-medium">
              {calculateKpl(value) || "0.00"} KPL
            </div>
          </div>

          <div className="space-y-2">
            <Label>Liters per 100 Kilometers (L/100km)</Label>
            <div className="p-2 bg-slate-100 rounded-md text-lg font-medium">
              {calculateLper100km(value) || "0.00"} L/100km
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuelConsumptionConverter;
