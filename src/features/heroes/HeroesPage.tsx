import { useEffect } from "react";
import { fetchHeroes } from "./heroesSlice";
import { useAppDispatch } from "../../app/hooks";
import HeroesList from "./HeroesList";

export default function HeroesPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);
  return (
    <>
      <HeroesList />
    </>
  );
}
