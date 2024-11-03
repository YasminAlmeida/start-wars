import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../screens/home";
import { People } from "../screens/people";
import { Films } from "../screens/films";
import { Planets } from "../screens/planets";
import { Species } from "../screens/species";
import { Starships } from "../screens/starships";
import { Vehicles } from "../screens/vehicles";
import { Themes } from "../types/theme";
import { ThemeType } from "../theme";

interface IRoutesProps {
  theme: Themes[ThemeType]["token"];
}

const AppRoutes: React.FC<IRoutesProps> = ({ theme }) => (
  <Routes>
    <Route path="/" element={<Home theme={theme} />} />
    <Route path="/people" element={<People />} />
    <Route path="/films" element={<Films />} />
    <Route path="/planets" element={<Planets />} />
    <Route path="/species" element={<Species />} />
    <Route path="/starships" element={<Starships />} />
    <Route path="/vehicles" element={<Vehicles />} />
  </Routes>
);

export default AppRoutes;
