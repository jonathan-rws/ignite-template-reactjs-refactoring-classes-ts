import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useEffect, useState } from 'react';

export default function Dashboard(){


  const [foods , setFoods] = useState([])
  const [editingFood , setEditingFood] = useState({})
  const [modalOpen , setModalOpen] = useState(false)
  const [editModalOpen , SetEditModalOpen] = useState(false)
 
  useEffect(()=>{
    async function getData(){
      const response = await api.get('/foods');
      setFoods(response.data)    }
    getData()
  },[])

async function handleAddFood(food){
  try {
    const response = await api.post('/foods', {
      ...food,
      available: true,
    });

    setFoods([...foods, response.data]);
  
  } catch (err) {
    console.log(err);
  }
}



async function handleUpdateFood(food){
  try {
    const foodUpdated = await api.put(
      `/foods/${editingFood.id}`,
      { ...editingFood, ...food },
    );

    const foodsUpdated = foods.map(f =>
      f.id !== foodUpdated.data.id ? f : foodUpdated.data,
    );
    setFoods(foodsUpdated)
 
  } catch (err) {
    console.log(err);
  }
}
async function handleDeleteFood(id){
    const data = [...foods]
    await api.delete(`/foods/${id}`);
    const foodsFiltered = data.filter(food => food.id !== id)
    setFoods(foodsFiltered)
    
}

function handleEditFood(food){
  setEditingFood(food)
  SetEditModalOpen(true)
}

function toggleModal (){
  setModalOpen(!modalOpen)

}
function toggleEditModal (){
  SetEditModalOpen(!editModalOpen)

}

  return (
    <>
      <Header openModal={toggleModal}/>
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

    <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}