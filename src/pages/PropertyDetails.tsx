
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Bed, Bath, Square, MapPin, Wifi, Car, AirVent, Shield, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Mock data - in a real app, this would come from your backend
const propertyData = {
  1: {
    id: 1,
    title: "Modern Downtown Apartment",
    address: "123 Main St, New York, NY 10001",
    rent: 2800,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"
    ],
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    rating: 4.8,
    type: "apartment",
    description: "Experience urban living at its finest in this beautifully renovated downtown apartment. Featuring modern amenities, stunning city views, and premium finishes throughout. Perfect for professionals seeking convenience and luxury in the heart of the city.",
    amenities: [
      "High-speed WiFi",
      "Parking Space",
      "Air Conditioning",
      "Security System",
      "Gym Access",
      "Rooftop Terrace"
    ],
    features: [
      "Hardwood floors",
      "Stainless steel appliances",
      "In-unit washer/dryer",
      "Floor-to-ceiling windows",
      "Modern kitchen",
      "Walk-in closet"
    ],
    owner: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@househunt.com"
    }
  }
};

const PropertyDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const property = propertyData[id as keyof typeof propertyData];

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <Link to="/categories">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleApplyNow = () => {
    toast({
      title: "Application Started!",
      description: "We'll contact you within 24 hours to schedule a viewing.",
    });
  };

  const handleContactOwner = () => {
    toast({
      title: "Contact Information",
      description: `Call ${property.owner.phone} or email ${property.owner.email}`,
    });
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? "Property removed from your saved list" : "Property saved to your favorites",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Back Button */}
        <Link to="/categories" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Link>

        {/* Property Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-100 text-blue-800 capitalize">{property.type}</Badge>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold ml-1">{property.rating}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{property.address}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={toggleFavorite}
              variant="outline"
              className={`${isFavorited ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
            >
              <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
              {isFavorited ? 'Favorited' : 'Save'}
            </Button>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">${property.rent}</div>
              <div className="text-gray-500">per month</div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative rounded-xl overflow-hidden mb-4">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-96 md:h-[500px] object-cover"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                  currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`View ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl">
              <div className="text-center">
                <Bed className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{property.bedrooms}</div>
                <div className="text-gray-600">Bedrooms</div>
              </div>
              <div className="text-center">
                <Bath className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{property.bathrooms}</div>
                <div className="text-gray-600">Bathrooms</div>
              </div>
              <div className="text-center">
                <Square className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{property.area}</div>
                <div className="text-gray-600">sq ft</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Property</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => {
                  const getIcon = (amenity: string) => {
                    if (amenity.includes('WiFi')) return <Wifi className="w-5 h-5" />;
                    if (amenity.includes('Parking')) return <Car className="w-5 h-5" />;
                    if (amenity.includes('Air')) return <AirVent className="w-5 h-5" />;
                    if (amenity.includes('Security')) return <Shield className="w-5 h-5" />;
                    return <Star className="w-5 h-5" />;
                  };

                  return (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-blue-600 mr-3">
                        {getIcon(amenity)}
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Owner</h3>
              <div className="space-y-3 mb-6">
                <div>
                  <div className="font-semibold text-gray-800">{property.owner.name}</div>
                  <div className="text-gray-600">{property.owner.phone}</div>
                  <div className="text-gray-600">{property.owner.email}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={handleApplyNow}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
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
            </div>

            {/* Quick Info */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-semibold capitalize">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rent:</span>
                  <span className="font-semibold">${property.rent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-semibold text-green-600">Now</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lease Term:</span>
                  <span className="font-semibold">12 months</span>
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
