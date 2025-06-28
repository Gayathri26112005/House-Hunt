
import { useParams } from 'react-router-dom';
import { Star, Bed, Bath, Square, MapPin, Heart, Share2, Calendar } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PropertyDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock property data - in real app, fetch based on id
  const property = {
    id: parseInt(id || '1'),
    title: "Modern Downtown Apartment",
    address: "123 Main St, New York, NY 10001",
    rent: 2800,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574691250077-03a929faece5?w=800&h=600&fit=crop"
    ],
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    rating: 4.8,
    type: "apartment",
    description: "Beautiful modern apartment in the heart of downtown. Features high ceilings, large windows, and premium finishes throughout. Walking distance to restaurants, shopping, and public transportation.",
    amenities: [
      "Air Conditioning",
      "Dishwasher",
      "In-unit Laundry",
      "Hardwood Floors",
      "Parking Included",
      "Pet Friendly",
      "Fitness Center",
      "Rooftop Deck"
    ],
    owner: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@example.com"
    }
  };

  const handleApplyNow = () => {
    toast({
      title: "Application Started!",
      description: "You'll be redirected to the application form.",
    });
  };

  const handleContactOwner = () => {
    toast({
      title: "Contact Information",
      description: `Call ${property.owner.phone} or email ${property.owner.email}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="lg:col-span-1">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Property ${index + 2}`}
                className="w-full h-44 object-cover rounded-xl"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.address}</span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="font-semibold">{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="font-semibold">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="font-semibold">{property.area} sqft</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold">{property.rating}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ${property.rent}
                  <span className="text-lg text-gray-500 font-normal">/month</span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                  {property.type}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <Button 
                  onClick={handleApplyNow}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
                <Button 
                  onClick={handleContactOwner}
                  variant="outline" 
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 py-3"
                >
                  Contact Owner
                </Button>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Property Owner</h4>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{property.owner.name}</p>
                  <p>{property.owner.phone}</p>
                  <p>{property.owner.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
