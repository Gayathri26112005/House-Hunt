
import { useState } from 'react';
import { Search, MapPin, Star, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PropertyCard from '@/components/PropertyCard';

const featuredProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    address: "123 Main St, New York, NY",
    rent: 2800,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    rating: 4.8,
    type: "apartment"
  },
  {
    id: 2,
    title: "Cozy Family House",
    address: "456 Oak Ave, Los Angeles, CA",
    rent: 3500,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    rating: 4.9,
    type: "house"
  },
  {
    id: 3,
    title: "Luxury Studio Loft",
    address: "789 Broadway, Chicago, IL",
    rent: 2200,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&h=300&fit=crop",
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    rating: 4.7,
    type: "studio"
  }
];

const Index = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('all');

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Find Your Perfect Rental
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            Discover amazing homes, apartments, and studios in prime locations
          </p>
          
          {/* Search Bar */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Enter location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 h-12 text-gray-800"
                />
              </div>
              
              <select 
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="h-12 px-4 rounded-md border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="studio">Studio</option>
              </select>
              
              <div className="flex items-center gap-2">
                <Input placeholder="Min Price" type="number" className="h-12 text-gray-800" />
                <Input placeholder="Max Price" type="number" className="h-12 text-gray-800" />
              </div>
              
              <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                <Search className="w-5 h-5 mr-2" />
                Search Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600">Handpicked properties for the best rental experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/categories">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied renters who found their perfect home through HouseHunt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/categories">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                Browse Properties
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
