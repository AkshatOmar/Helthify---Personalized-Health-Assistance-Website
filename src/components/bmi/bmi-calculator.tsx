import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Ruler, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Unit = 'metric' | 'imperial';
type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';

interface BMIResult {
  bmi: number;
  category: string;
  healthyRangeMin: number;
  healthyRangeMax: number;
  idealWeightRange: {
    min: number;
    max: number;
  };
}

export function BMICalculator() {
  const [unit, setUnit] = useState<Unit>('metric');
  const [gender, setGender] = useState<Gender>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);

  const activityLevels = {
    sedentary: 'Little or no exercise',
    light: 'Light exercise 1-3 times/week',
    moderate: 'Moderate exercise 3-5 times/week',
    active: 'Hard exercise 6-7 times/week',
    'very-active': 'Professional athlete',
  };

  const calculateBMI = () => {
    let bmiValue: number;
    let heightInM: number;
    let weightInKg: number;

    if (unit === 'metric') {
      heightInM = parseFloat(height) / 100; // cm to m
      weightInKg = parseFloat(weight);
    } else {
      heightInM = (parseFloat(height) * 2.54) / 100; // inches to m
      weightInKg = parseFloat(weight) * 0.45359237; // lbs to kg
    }

    bmiValue = weightInKg / (heightInM * heightInM);

    let category: string;
    if (bmiValue < 18.5) category = 'Underweight';
    else if (bmiValue < 25) category = 'Normal weight';
    else if (bmiValue < 30) category = 'Overweight';
    else category = 'Obese';

    // Calculate ideal weight range based on healthy BMI range (18.5-24.9)
    const idealWeightRange = {
      min: 18.5 * (heightInM * heightInM),
      max: 24.9 * (heightInM * heightInM),
    };

    setResult({
      bmi: bmiValue,
      category,
      healthyRangeMin: 18.5,
      healthyRangeMax: 24.9,
      idealWeightRange,
    });
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-blue-500';
    if (bmi < 25) return 'text-green-500';
    if (bmi < 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">BMI Calculator</h1>
              <p className="mt-2 text-gray-600">
                Calculate your Body Mass Index and get personalized insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                {/* Unit Toggle */}
                <div className="flex rounded-lg overflow-hidden border">
                  {(['metric', 'imperial'] as const).map((u) => (
                    <button
                      key={u}
                      onClick={() => setUnit(u)}
                      className={`flex-1 py-2 px-4 text-sm font-medium ${
                        unit === u
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {u.charAt(0).toUpperCase() + u.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Gender Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="flex rounded-lg overflow-hidden border">
                    {(['male', 'female'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`flex-1 py-2 px-4 text-sm font-medium ${
                          gender === g
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Height Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Height
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Ruler className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="block w-full pl-10 pr-12 py-2 border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="Enter height"
                      step="0.1"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">
                        {unit === 'metric' ? 'cm' : 'in'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Weight Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Weight
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Scale className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="block w-full pl-10 pr-12 py-2 border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="Enter weight"
                      step="0.1"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">
                        {unit === 'metric' ? 'kg' : 'lbs'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Age Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="block w-full py-2 px-3 border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    placeholder="Enter age"
                  />
                </div>

                {/* Activity Level */}
                <div className="space-y-2">
                  <label
                    htmlFor="activity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Activity Level
                  </label>
                  <select
                    id="activity"
                    value={activityLevel}
                    onChange={(e) =>
                      setActivityLevel(e.target.value as ActivityLevel)
                    }
                    className="block w-full py-2 px-3 border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  >
                    {Object.entries(activityLevels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={calculateBMI}
                  disabled={!height || !weight || !age}
                  className="w-full"
                  size="lg"
                >
                  Calculate BMI
                </Button>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                {result ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <h2 className="text-2xl font-bold mb-2">Your BMI</h2>
                      <p
                        className={`text-4xl font-bold ${getBMIColor(
                          result.bmi
                        )}`}
                      >
                        {result.bmi.toFixed(1)}
                      </p>
                      <p
                        className={`text-lg font-medium ${getBMIColor(
                          result.bmi
                        )}`}
                      >
                        {result.category}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Healthy BMI Range</h3>
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{
                            width: `${
                              ((result.healthyRangeMax - result.healthyRangeMin) /
                                40) *
                              100
                            }%`,
                            marginLeft: `${
                              (result.healthyRangeMin / 40) * 100
                            }%`,
                          }}
                        />
                        <div
                          className="h-4 w-2 bg-black absolute"
                          style={{
                            marginLeft: `${(result.bmi / 40) * 100}%`,
                            transform: 'translateX(-50%)',
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>0</span>
                        <span>20</span>
                        <span>40</span>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">
                          Ideal Weight Range
                        </h3>
                        <p className="text-gray-600">
                          Based on your height, a healthy weight range would be:
                        </p>
                        <p className="text-lg font-medium text-primary">
                          {result.idealWeightRange.min.toFixed(1)}
                          {unit === 'metric' ? 'kg' : 'lbs'} -{' '}
                          {result.idealWeightRange.max.toFixed(1)}
                          {unit === 'metric' ? 'kg' : 'lbs'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Info className="h-12 w-12 mb-4" />
                    <p className="text-center">
                      Enter your details to calculate your BMI and get personalized
                      recommendations
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BMI Information */}
          <div className="bg-gray-50 px-6 py-8 sm:px-8">
            <h3 className="text-lg font-medium mb-4">Understanding BMI</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">BMI Categories:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-blue-500">Underweight: &lt; 18.5</li>
                  <li className="text-green-500">Normal weight: 18.5 - 24.9</li>
                  <li className="text-yellow-500">Overweight: 25 - 29.9</li>
                  <li className="text-red-500">Obese: ≥ 30</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Important Notes:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    BMI is a general indicator and may not be accurate for
                    athletes, elderly, or pregnant women
                  </li>
                  <li>
                    Consult a healthcare provider for a complete health assessment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}