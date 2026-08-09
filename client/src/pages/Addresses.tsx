
import { useEffect, useState } from "react";

import type { Address } from "../types";
import { MapPinIcon, PlusIcon } from "lucide-react";
import Loading from "../components/Loading";
import AddressCard from "../components/AddressCard";
import AddressForm from "../components/AddressForm";
import { useAuth } from "../context/AuthContext";
import api from "../config/api";
import toast from "react-hot-toast";


const Addresses = () => {

  const {updateUser}=useAuth()

  // here we can set multiple addresses thats why using array
  const [addresses, setAddresses] = useState<Address[]>([])
  // after loading address data make it false
  const [loading, setLoading] = useState(true)
  // intially use state is hidden ,when make it true it displays the form add address or existing.showing form page or label
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  // in this we will store multiple data(address zipcode etcc)
  const [form, setForm] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false
  });
  const resetForm = () => {
    setForm({
      label: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false
    });
    setShowForm(false)
    setEditingId(null)
  }

  const getLocation=(retries=3): Promise<{lat: number; lng: number}>=>{
    return new Promise((resolve, reject)=>{
  if(!navigator.geolocation){
    reject(new Error("Geolocation not supported"))
    return ;
  }
  const attempt=()=>{
    navigator.geolocation.getCurrentPosition(
    (position)=>{
      resolve({
        lat:  position.coords.latitude,
        lng:  position.coords.longitude,
      })
    }  ,
    (error:any)=>{
        if(retries>0){
          retries--;
          setTimeout(attempt, 1000)

        }else{
          reject(new Error(error.message || "Failed to get location after retries"))
        }
    },
    {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 6000,
    }
    )
  };
  attempt()
    })
  }

  // this function excutes when form is submitted
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    try{
   const coords=await getLocation()
   const payload={...form, ...coords}

    if(editingId){
      // updating existing addresses
      const {data}=await api.put(`/addresses/${editingId}`, payload);
      setAddresses(data.addresses)
      updateUser({addresses: data.addresses})
      toast.success("Address updated!")
    }else{
    //  for new addresses
    const {data}=await api.post(`/addresses/`, payload);
    setAddresses(data.addresses)
    updateUser({addresses: data.addresses})
      toast.success("Address updated!")
    }
     resetForm()

    }catch(error:any){
    toast.error(error.response?.data?.message || error.message || "Failed")
    }
  }

  const onEditHandler = (add: Address) => {
    setForm({
      label: add.label,
      address: add.address,
      city: add.city,
      state: add.state,
      zip: add.zip,
      isDefault: add.isDefault
    })
    setEditingId(add.id)
    setShowForm(true)
  }

  useEffect(() => {
    // see from here ->here first update types/index foler after that based on index create dummy data in assests
    // setAddresses(dummyAddressData)
    // setTimeout(() => setLoading(false), 1000)
    api.get('/addresses').then(({data})=>{
      setAddresses(data.addresses)
    }).catch((error:any)=>{
     toast.error(error.response?.data?.message || error?.message)
    }).finally(()=>{
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-app-green">My Addresses</h1>
          <button onClick={() => { resetForm(); setShowForm(true) }} className="px-4 py-2 bg-app-green text-white text-sm font-semibold rounded-xl hover:bg-app-green-light transition-colors flex items-center gap-2">
            <PlusIcon className="size-4" />Add Address
          </button>
        </div>
  
          {/* Form Modal -> import here our addressform component */}
             {showForm && <AddressForm resetForm={resetForm} handleSubmit={handleSubmit} form={form} setForm={setForm} editingId={editingId}/>}
    

          {/* Addresses List */}
        {
          loading ? (
            <Loading />
          ) : addresses.length ===0 ? (
            <div className="text-center py-16">
              <MapPinIcon className="size-16 text-app-border mx-auto mb-4"/>
               <h2 className="text-lg font-semibold text-app-green">No addresses saved</h2>
               <p className="text-sm text-app-text-light">Add an address for faster checkout</p>
            </div>
      
          ):
          (
            <div className="space-y-4">
               {addresses.map((addr)=> (
                // <div>{add.address}</div>
                <AddressCard key={addr.id} addr={addr} onEditHandler={onEditHandler} setAddresses={setAddresses}/>
               ))}
            </div>
          )
        }

      </div>
    </div>
  )
}

export default Addresses