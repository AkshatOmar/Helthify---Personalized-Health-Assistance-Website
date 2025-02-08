import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Apple, Clock, Siren as Fire } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DietaryPreference = 'all' | 'vegetarian' | 'vegan' | 'keto' | 'paleo';
type Goal = 'all' | 'weight-loss' | 'muscle-gain' | 'maintenance';

interface Meal {
  id: string;
  name: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  dietaryTags: string[];
  ingredients: string[];
}

interface MealPlan {
  id: string;
  title: string;
  description: string;
  goal: Goal;
  calories: number;
  image: string;
  dietaryTags: string[];
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: Meal[];
  };
}

const MEAL_PLANS: MealPlan[] = [
  {
    id: '1',
    title: 'Weight Loss Essentials',
    description: 'A balanced, calorie-controlled plan for sustainable weight loss',
    goal: 'weight-loss',
    calories: 1500,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80',
    dietaryTags: ['vegetarian'],
    meals: {
      breakfast: {
        id: 'b1',
        name: 'Greek Yogurt Parfait',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80',
        calories: 300,
        protein: 20,
        carbs: 30,
        fat: 10,
        prepTime: 10,
        dietaryTags: ['vegetarian'],
        ingredients: ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey'],
      },
      lunch: {
        id: 'l1',
        name: 'Mediterranean Quinoa Bowl',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80',
        calories: 400,
        protein: 15,
        carbs: 45,
        fat: 15,
        prepTime: 20,
        dietaryTags: ['vegetarian', 'vegan'],
        ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Tomatoes', 'Olive oil'],
      },
      dinner: {
        id: 'd1',
        name: 'Grilled Salmon with Vegetables',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80',
        calories: 500,
        protein: 35,
        carbs: 20,
        fat: 25,
        prepTime: 30,
        dietaryTags: [],
        ingredients: ['Salmon fillet', 'Asparagus', 'Sweet potato', 'Lemon'],
      },
      snacks: [
        {
          id: 's1',
          name: 'Apple with Almond Butter',
          image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&q=80',
          calories: 150,
          protein: 5,
          carbs: 20,
          fat: 8,
          prepTime: 5,
          dietaryTags: ['vegetarian', 'vegan'],
          ingredients: ['Apple', 'Almond butter'],
        },
      ],
    },
  },
  {
    id: '2',
    title: 'Muscle Builder Pro',
    description: 'High-protein meals designed for muscle growth and recovery',
    goal: 'muscle-gain',
    calories: 3000,
    image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80',
    dietaryTags: [],
    meals: {
      breakfast: {
        id: 'b2',
        name: 'Protein Oatmeal Bowl',
        image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80',
        calories: 600,
        protein: 40,
        carbs: 70,
        fat: 15,
        prepTime: 15,
        dietaryTags: ['vegetarian'],
        ingredients: ['Oats', 'Protein powder', 'Banana', 'Peanut butter'],
      },
      lunch: {
        id: 'l2',
        name: 'Chicken Rice Bowl',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80',
        calories: 800,
        protein: 50,
        carbs: 90,
        fat: 20,
        prepTime: 25,
        dietaryTags: [],
        ingredients: ['Chicken breast', 'Brown rice', 'Broccoli', 'Avocado'],
      },
      dinner: {
        id: 'd2',
        name: 'Steak with Sweet Potato',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80',
        calories: 900,
        protein: 60,
        carbs: 60,
        fat: 35,
        prepTime: 35,
        dietaryTags: [],
        ingredients: ['Ribeye steak', 'Sweet potato', 'Spinach', 'Olive oil'],
      },
      snacks: [
        {
          id: 's2',
          name: 'Protein Smoothie',
          image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80',
          calories: 300,
          protein: 25,
          carbs: 30,
          fat: 10,
          prepTime: 5,
          dietaryTags: ['vegetarian'],
          ingredients: ['Protein powder', 'Banana', 'Almond milk', 'Berries'],
        },
      ],
    },
  },
];

export function MealPlans() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<DietaryPreference>('all');
  const [selectedGoal, setSelectedGoal] = useState<Goal>('all');
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

  const filteredPlans = MEAL_PLANS.filter((plan) => {
    const matchesSearch = plan.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDiet =
      selectedDiet === 'all' ||
      plan.meals.breakfast.dietaryTags.includes(selectedDiet) ||
      plan.meals.lunch.dietaryTags.includes(selectedDiet) ||
      plan.meals.dinner.dietaryTags.includes(selectedDiet);
    const matchesGoal = selectedGoal === 'all' || plan.goal === selectedGoal;

    return matchesSearch && matchesDiet && matchesGoal;
  });

  const dietaryOptions: { value: DietaryPreference; label: string }[] = [
    { value: 'all', label: 'All Diets' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
  ];

  const goalOptions: { value: Goal; label: string }[] = [
    { value: 'all', label: 'All Goals' },
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'muscle-gain', label: 'Muscle Gain' },
    { value: 'maintenance', label: 'Maintenance' },
  ];

  return (
    <div className="min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meal Plans</h1>
          <p className="mt-2 text-gray-600">
            Discover personalized meal plans tailored to your goals
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search meal plans..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value as DietaryPreference)}
                className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                {dietaryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value as Goal)}
                className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                {goalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Meal Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${plan.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Fire className="h-4 w-4 mr-1" />
                    {plan.calories} kcal
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Apple className="h-4 w-4 mr-1" />
                    {plan.dietaryTags.join(', ') || 'Regular'}
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedPlan(plan)}
                  className="w-full mt-4"
                >
                  View Plan
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Plan Modal */}
        {selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedPlan.title}
                    </h2>
                    <p className="mt-1 text-gray-600">
                      {selectedPlan.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Meal Schedule */}
                <div className="space-y-6">
                  {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                    const meal = selectedPlan.meals[mealType as keyof typeof selectedPlan.meals];
                    if (!Array.isArray(meal)) {
                      return (
                        <div key={mealType} className="border rounded-lg p-4">
                          <h3 className="text-lg font-medium capitalize mb-4">
                            {mealType}
                          </h3>
                          <div className="flex flex-col md:flex-row gap-4">
                            <img
                              src={meal.image}
                              alt={meal.name}
                              className="w-full md:w-48 h-48 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="text-xl font-medium">{meal.name}</h4>
                              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div>
                                  <div className="text-sm text-gray-500">
                                    Calories
                                  </div>
                                  <div className="font-medium">
                                    {meal.calories} kcal
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500">
                                    Protein
                                  </div>
                                  <div className="font-medium">
                                    {meal.protein}g
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500">
                                    Carbs
                                  </div>
                                  <div className="font-medium">{meal.carbs}g</div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500">Fat</div>
                                  <div className="font-medium">{meal.fat}g</div>
                                </div>
                              </div>
                              <div className="mt-4">
                                <h5 className="font-medium mb-2">Ingredients</h5>
                                <ul className="list-disc list-inside text-gray-600">
                                  {meal.ingredients.map((ingredient) => (
                                    <li key={ingredient}>{ingredient}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="mt-4 flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {meal.prepTime} minutes prep time
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}

                  {/* Snacks */}
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">Snacks</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedPlan.meals.snacks.map((snack) => (
                        <div
                          key={snack.id}
                          className="flex items-start space-x-4"
                        >
                          <img
                            src={snack.image}
                            alt={snack.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium">{snack.name}</h4>
                            <div className="mt-1 text-sm text-gray-500">
                              {snack.calories} kcal
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              Protein: {snack.protein}g
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}