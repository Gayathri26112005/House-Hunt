
import { Link } from 'react-router-dom';
import { Star, Bed, Bath, Square, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Property {
  id: number;
  title: string;
  address: string;
  rent: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  rating: number;
  type: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
            {property.type}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-semibold ml-1">{property.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.address}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{property.area} sqft</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">${property.rent}</span>
            <span className="text-gray-500">/month</span>
          </div>
          <div className="flex space-x-2">
            <Link to={`/property/${property.id}`}>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                View Details
              </Button>
            </Link>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Contact Owner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
