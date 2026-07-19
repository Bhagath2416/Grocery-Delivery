import type { Address } from "../types";

export const dummyAddressData: Address[] = [
  {
    _id: "1",
    label: "Home",
    address: "123 MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    zip: "560001",
    isDefault: true,
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    _id: "2",
    label: "Office",
    address: "456 Cyber City",
    city: "Hyderabad",
    state: "Telangana",
    zip: "500081",
    isDefault: false,
    lat: 17.4435,
    lng: 78.3772,
  },
  {
    _id: "3",
    label: "Parents",
    address: "78 Anna Salai",
    city: "Chennai",
    state: "Tamil Nadu",
    zip: "600002",
    isDefault: false,
    lat: 13.0827,
    lng: 80.2707,
  },
];