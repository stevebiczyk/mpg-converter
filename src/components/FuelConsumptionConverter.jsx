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
        kmpl: "0.00",
        lper100km: "0.00",
        mpl: "0.00",
        kmpig: "0.00",
        kmpusg: "0.00",
      };
    }

    // First convert to kmpl as our base unit
    let kmpl;
    switch (fromUnit) {
      case "impmpg":
        kmpl = (inputValue * MILES_TO_KM) / IMPERIAL_GALLON_TO_LITERS;
        break;
      case "usmpg":
        kmpl = (inputValue * MILES_TO_KM) / US_GALLON_TO_LITERS;
        break;
      case "kmpl":
        kmpl = inputValue;
        break;
      case "lper100km":
        kmpl = 100 / inputValue;
        break;
      case "mpl":
        kmpl = inputValue * MILES_TO_KM;
        break;
      default:
        kmpl = 0;
    }

    // Then convert kmpl to all other units
    return {
      impmpg: ((kmpl * IMPERIAL_GALLON_TO_LITERS) / MILES_TO_KM).toFixed(2),
      usmpg: ((kmpl * US_GALLON_TO_LITERS) / MILES_TO_KM).toFixed(2),
      kmpl: kmpl.toFixed(2),
      lper100km: (100 / kmpl).toFixed(2),
      mpl: (kmpl / MILES_TO_KM).toFixed(2),
      kmpig: (kmpl * IMPERIAL_GALLON_TO_LITERS).toFixed(2),
      kmpusg: (kmpl * US_GALLON_TO_LITERS).toFixed(2),
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
            <Label>Imperial MPG</Label>
            <div className="p-2 bg-slate-100 rounded-md text-lg font-medium">
              {results.impmpg || "0.00"}
            </div>
          </div>

          <div className="space-y-2">
            <Label>US MPG</Label>
            <div className="p-2 bg-slate-100 rounded-md text-lg font-medium">
              {results.usmpg || "0.00"}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Kilometers per Liter </Label>
            <div className="p-2 bg-slate-100 rounded-md text-lg font-medium">
              {results.kmpl || "0.00"}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Liters per 100Km</Label>
            <div className="p-2 bg-slate-100 rounded-md text-lg font-medium">
              {results.lper100km || "0.00"}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Miles per Liter</Label>
            <div className="p-2 bg-slate-100 rounded-md text-lg font-medium">
              {results.mpl || "0.00"}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Km per Imperial Gallon</Label>
            <div className="p-2 bg-slate-100 rounded-md text-lg font-medium">
              {results.kmpig || "0.00"}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Km per US Gallon</Label>
            <div className="p-2 bg-slate-100 rounded-md text-lg font-medium">
              {results.kmpusg || "0.00"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuelConsumptionConverter;
