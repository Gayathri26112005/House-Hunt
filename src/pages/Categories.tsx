
import { useState } from 'react';
import { Search, Filter, MapPin, Star, Bed, Bath, Square } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const allProperties = [
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
  },
  {
    id: 4,
    title: "Spacious Suburban Home",
    address: "321 Pine St, Austin, TX",
    rent: 2900,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop",
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    rating: 4.6,
    type: "house"
  },
  {
    id: 5,
    title: "Urban Studio",
    address: "654 Market St, San Francisco, CA",
    rent: 3200,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&h=300&fit=crop",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    rating: 4.5,
    type: "studio"
  },
  {
    id: 6,
    title: "Executive Apartment",
    address: "987 Central Ave, Miami, FL",
    rent: 3800,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    rating: 4.8,
    type: "apartment"
  }
];

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('price-low');

  const filteredProperties = allProperties
    .filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || property.type === selectedType;
      const matchesMinPrice = !minPrice || property.rent >= parseInt(minPrice);
      const matchesMaxPrice = !maxPrice || property.rent <= parseInt(maxPrice);
      
      return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.rent - b.rent;
        case 'price-high':
          return b.rent - a.rent;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Properties</h1>
          <p className="text-xl opacity-90">Find your perfect home from our extensive collection</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Property Type */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Price Range */}
            <Input
              placeholder="Min Price"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              placeholder="Max Price"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredProperties.length} Properties Found
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span>Filtered Results</span>
            </div>
          </div>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Properties Found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categories;
