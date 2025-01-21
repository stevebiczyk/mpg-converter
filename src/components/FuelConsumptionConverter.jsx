import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, RotateCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PropTypes from "prop-types";

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
    setValue(e.target.value);
  };

  const handleUnitChange = (newUnit) => {
    setInputUnit(newUnit);
  };

  const handleReset = () => {
    setValue("");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const results = calculateAllConversions(value, inputUnit);

  const ResultRow = ({ label, value, tooltip }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label className="cursor-help">{label}</Label>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex space-x-2">
        <div className="p-2 bg-slate-100 rounded-md text-lg font-medium flex-grow">
          {value}
        </div>
        <Button variant="outline" size="icon" onClick={() => handleCopy(value)}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  // Define prop types
  ResultRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    tooltip: PropTypes.string,
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Fuel Consumption Converter
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Input Value and Unit</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                value={value}
                onChange={handleInputChange}
                placeholder="Enter value"
                className="flex-grow"
              />
              <Select value={inputUnit} onValueChange={handleUnitChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="impmpg">Imperial MPG</SelectItem>
                  <SelectItem value="usmpg">US MPG</SelectItem>
                  <SelectItem value="kpl">KM/L</SelectItem>
                  <SelectItem value="lper100km">L/100KM</SelectItem>
                  <SelectItem value="mpl">Miles/L</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <ResultRow
              label="Imperial MPG"
              value={results.impmpg}
              tooltip="Miles per Imperial Gallon (UK standard)"
            />
            <ResultRow
              label="US MPG"
              value={results.usmpg}
              tooltip="Miles per US Gallon (US standard)"
            />
            <ResultRow
              label="Kilometers per Liter"
              value={results.kpl}
              tooltip="Kilometers traveled per liter of fuel"
            />
            <ResultRow
              label="L/100KM"
              value={results.lper100km}
              tooltip="Liters of fuel per 100 kilometers (European standard)"
            />
            <ResultRow
              label="Miles per Liter"
              value={results.mpl}
              tooltip="Miles traveled per liter of fuel"
            />
            <ResultRow
              label="KM per Imperial Gallon"
              value={results.kmpig}
              tooltip="Kilometers traveled per Imperial gallon"
            />
            <ResultRow
              label="KM per US Gallon"
              value={results.kmpusg}
              tooltip="Kilometers traveled per US gallon"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuelConsumptionConverter;

// const FuelConsumptionConverter = () => {
//   const [value, setValue] = useState("");
//   const [inputUnit, setInputUnit] = useState("impmpg");

//   // Conversion constants
//   const IMPERIAL_GALLON_TO_LITERS = 4.54609188;
//   const US_GALLON_TO_LITERS = 3.78541178;
//   const MILES_TO_KM = 1.609344;

//   const calculateAllConversions = (inputValue, fromUnit) => {
//     if (!inputValue || isNaN(inputValue)) {
//       return {
//         impmpg: "0.00",
//         usmpg: "0.00",
//         kmpl: "0.00",
//         lper100km: "0.00",
//         mpl: "0.00",
//         kmpig: "0.00",
//         kmpusg: "0.00",
//       };
//     }

//     // First convert to kmpl as our base unit
//     let kmpl;
//     switch (fromUnit) {
//       case "impmpg":
//         kmpl = (inputValue * MILES_TO_KM) / IMPERIAL_GALLON_TO_LITERS;
//         break;
//       case "usmpg":
//         kmpl = (inputValue * MILES_TO_KM) / US_GALLON_TO_LITERS;
//         break;
//       case "kmpl":
//         kmpl = inputValue;
//         break;
//       case "lper100km":
//         kmpl = 100 / inputValue;
//         break;
//       case "mpl":
//         kmpl = inputValue * MILES_TO_KM;
//         break;
//       default:
//         kmpl = 0;
//     }

//     // Then convert kmpl to all other units
//     return {
//       impmpg: ((kmpl * IMPERIAL_GALLON_TO_LITERS) / MILES_TO_KM).toFixed(2),
//       usmpg: ((kmpl * US_GALLON_TO_LITERS) / MILES_TO_KM).toFixed(2),
//       kmpl: kmpl.toFixed(2),
//       lper100km: (100 / kmpl).toFixed(2),
//       mpl: (kmpl / MILES_TO_KM).toFixed(2),
//       kmpig: (kmpl * IMPERIAL_GALLON_TO_LITERS).toFixed(2),
//       kmpusg: (kmpl * US_GALLON_TO_LITERS).toFixed(2),
//     };
//   };

//   const handleInputChange = (e) => {
//     setValue(e.target.value);
//   };

//   const handleUnitChange = (newUnit) => {
//     setInputUnit(newUnit);
//   };

//   const results = calculateAllConversions(value, inputUnit);

//   const handleReset = () => {
//     setValue("");
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   const ResultRow = ({ label, value }) => (
//     <div className="space-y-2">
//       <div className="flex justify-between items-center">
//         <Label>{label}</Label>
//         <div className="flex space-x-2">
//           <div className="p-2 bg-slate-100 rounded-md text-lg font-medium">
//             {value}
//           </div>
//         </div>
//         <Button variant="outline" size="icon" onClick={() => handleCopy(value)}>
//           <Copy className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle className="flex justify-between items-center">
//           Fuel Consumption Converter
//           <Button variant="outline" size="icon" onClick={handleReset}>
//             <RotateCcw className="h-4 w-4" />
//           </Button>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label>Input Value and Unit</Label>
//             <div className="flex space-x-2">
//               <Input
//                 type="number"
//                 value={value}
//                 onChange={handleInputChange}
//                 placeholder="Enter value"
//                 className="flex-grow"
//               />
//               <Select value={inputUnit} onValueChange={handleUnitChange}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select unit" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="impmpg">Imperial MPG</SelectItem>
//                   <SelectItem value="usmpg">US MPG</SelectItem>
//                   <SelectItem value="kpl">KM/L</SelectItem>
//                   <SelectItem value="lper100km">L/100KM</SelectItem>
//                   <SelectItem value="mpl">Miles/L</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <ResultRow label="Imperial MPG" value={results.impmpg} />
//             <ResultRow label="US MPG" value={results.usmpg} />
//             <ResultRow label="Kilometers per Liter" value={results.kmpl} />
//             <ResultRow label="L/100KM" value={results.lper100km} />
//             <ResultRow label="Miles per Liter" value={results.mpl} />
//             <ResultRow label="KM per Imperial Gallon" value={results.kmpig} />
//             <ResultRow label="KM per US Gallon" value={results.kmpusg} />
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default FuelConsumptionConverter;
