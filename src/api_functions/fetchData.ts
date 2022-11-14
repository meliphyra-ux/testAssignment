export interface Location {
  lat: number;
  long: number;
}
export interface Job {
  address: string;
  benefits: string[];
  createdAt: string;
  description: string;
  email: string;
  employment_type: string[];
  id: string;
  location: Location;
  name: string;
  phone: string;
  pictures: string[];
  salary: string;
  title: string;
  updatedAt: string;
}

export const fetchData = async (): Promise<Job[]> => {
  const data = await fetch(
    `https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=${
      import.meta.env.VITE_API_ACCESS_KEY
    }`
  );
  return data.json();
};
