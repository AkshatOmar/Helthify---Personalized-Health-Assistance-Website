import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Hero } from '@/components/home/hero';
import { AuthForm } from '@/components/auth/auth-form';
import { BMICalculator } from '@/components/bmi/bmi-calculator';
import { MealPlans } from '@/components/meals/meal-plans';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<AuthForm type="login" />} />
          <Route path="/signup" element={<AuthForm type="signup" />} />
          <Route path="/bmi" element={<BMICalculator />} />
          <Route path="/meals" element={<MealPlans />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;