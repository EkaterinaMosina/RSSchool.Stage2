import { forbidClick, allowClick, GENERATE_100_RANDOM_CARS, renderElement } from '../../utils/utils';
import updateGaragePage from '../garage/updateGaragePage';
import createCar from '../../server/createCar';

const addCar = async () => {
  const car = {
    name: localStorage.getItem('name'),
    color: localStorage.getItem('color'),
  };
  if (localStorage.getItem('color') === null) {
    car.color = '#000000';
  }
  await createCar(car);
  await updateGaragePage();
  localStorage.clear();
};
  
const generateCars = async (buttonGenerateCars: HTMLElement) => {
  forbidClick(buttonGenerateCars);
  
  const randomCars = GENERATE_100_RANDOM_CARS();
  await Promise.all(randomCars.map(async (car) => createCar(car)));
  await updateGaragePage();

  allowClick(buttonGenerateCars);
};
  
export default function listenGarageChanges()  {
  const buttonGenerateCars = renderElement('#generate');
  buttonGenerateCars.addEventListener('click', async () => generateCars(buttonGenerateCars));
  
  const formCreate = renderElement('.form-create');
  formCreate.addEventListener('submit', async (e) => {
    e.preventDefault();
    await addCar();
  });
}