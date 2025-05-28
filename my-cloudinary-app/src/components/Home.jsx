import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Star, Clock, Users, DollarSign, Camera, Sun, Mountain, Waves, Globe, Tent, Compass } from 'lucide-react';

const JordanToursWebsite = () => {
  const [activeSection, setActiveSection] = useState('petra');
  const [scrollY, setScrollY] = useState(0);
  const [language, setLanguage] = useState('en');
  const [youTubeReady, setYouTubeReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const videoRefs = useRef({});
  const players = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = () => {
        setYouTubeReady(true);
      };
    } else {
      setYouTubeReady(true);
    }
  }, []);

  // Initialize YouTube players
  useEffect(() => {
    if (youTubeReady && window.YT) {
      Object.keys(destinations).forEach(key => {
        const destination = destinations[key];
        const videoId = destination.video.split('/embed/')[1];
        
        if (videoRefs.current[key] && !players.current[key]) {
          try {
            players.current[key] = new window.YT.Player(videoRefs.current[key], {
              videoId: videoId,
              playerVars: {
                autoplay: 0,
                mute: 1,
                controls: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0
              },
              events: {
                onReady: () => {
                  console.log(`Player ready for ${key}`);
                },
                onError: (error) => {
                  console.log(`Player error for ${key}:`, error);
                }
              }
            });
          } catch (error) {
            console.log(`Error creating player for ${key}:`, error);
          }
        }
      });
    }
  }, [youTubeReady]);

  // Intersection Observer for video auto-play
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5, // Video plays when 50% visible
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const videoKey = entry.target.getAttribute('data-video-key');
        const player = players.current[videoKey];
        
        if (player && typeof player.playVideo === 'function') {
          if (entry.isIntersecting) {
            try {
              player.playVideo();
            } catch (error) {
              console.log(`Error playing video ${videoKey}:`, error);
            }
          } else {
            try {
              player.pauseVideo();
            } catch (error) {
              console.log(`Error pausing video ${videoKey}:`, error);
            }
          }
        }
      });
    }, observerOptions);

    // Observe all video containers
    Object.keys(destinations).forEach(key => {
      const videoContainer = document.querySelector(`[data-video-key="${key}"]`);
      if (videoContainer) {
        observer.observe(videoContainer);
      }
    });

    return () => observer.disconnect();
  }, [youTubeReady]);

  const isRTL = language === 'ar';

  const translations = {
    en: {
      title: "Jordan Adventures",
      subtitle: "Discover the wonders of Petra, Wadi Rum, and Aqaba through unforgettable experiences",
      bookNow: "Book Now",
      contactUs: "Contact Us",
      readyAdventure: "Ready for Adventure?",
      bookExperience: "Book your unforgettable Jordan experience today",
      prices: "Prices",
      duration: "Duration",
      capacity: "Capacity",
      includes: "Includes",
      note: "Note",
      welcomeGuest: "Welcome, Guest",
      jordanKingdom: "The Hashemite Kingdom of Jordan",
      languageSwitch: "العربية",
      // Activity translations
      hotAirBalloon: "Hot Air Balloon",
      lunchInPetra: "Lunch in Petra",
      balloonsOverRum: "Balloons over Rum",
      sunsetSafariTour: "Sunset Safari Tour",
      sunriseCamelTour: "Sunrise Camel Tour",
      starGazing: "Star Gazing",
      parasailing: "Parasailing",
      jetSki: "Jet Ski",
      diving: "Diving",
      waterPark: "Water Park",
      // Time and duration translations
      minutes: "minutes",
      hour: "hour",
      hours: "hours",
      daily: "Daily",
      sunrise: "at sunrise",
      departure: "Departure",
      fromCamps: "from camps",
      // Descriptions and details
      altitude: "altitude",
      flight: "flight",
      people: "people",
      perCar: "per car",
      perPerson: "per person",
      dependingOnCamp: "depending on camp location",
      mainSites: "main sites",
      hollywoodFilming: "Hollywood filming locations, Arab makeup, inscriptions, rock face, sand dunes, Lawrence of Arabia trail",
      telescopes: "types of telescopes",
      photographyIncluded: "Photography included",
      weightLimit: "Weight limit",
      ageLimit: "Age limit",
      above: "Above",
      years: "years",
      upTo: "Up to",
      kg: "kg",
      location: "Location",
      coralChain: "Coral Chain",
      requirements: "Requirements",
      noRespiratoryHeart: "No respiratory/heart problems, no recent surgeries",
      includedServices: "Photography, transport, short video, modest clothing for veiled women, female diving instructor available",
      operatingHours: "Operating hours",
      attractions: "attractions",
      games: "games",
      windSurf: "Wind surf",
      // Price categories
      foreign: "Foreign",
      jordanian: "Jordanian",
      child: "Child",
      nonJordanian: "Non-Jordanian",
      adult: "Adult",
      single: "Single",
      double: "Double",
      triple: "Triple",
      privateCar: "Private Car",
      withLunch: "With Lunch",
      noLunch: "No Lunch",
      halfPrice: "Half price",
      under5Free: "Under 5 years free for foreigners and Arabs",
      // Additional labels
      min: "Min",
      am: "AM",
      pm: "PM",
      to: "to",
      and: "and",
      // Navigation and contact
      backToTop: "Back to Top",
      destinations: {
        petra: { name: "Petra" },
        wadirum: { name: "Wadi Rum" },
        aqaba: { name: "Aqaba" }
      }
    },
    ar: {
      title: "مغامرات الأردن",
      subtitle: "اكتشف عجائب البترا ووادي رم والعقبة من خلال تجارب لا تُنسى",
      bookNow: "احجز الآن",
      contactUs: "اتصل بنا", 
      readyAdventure: "مستعد للمغامرة؟",
      bookExperience: "احجز تجربتك الأردنية الرائعة اليوم",
      prices: "الأسعار",
      duration: "المدة",  
      capacity: "السعة",
      includes: "يشمل",
      note: "ملاحظة",
      welcomeGuest: "أهلاً وسهلاً",
      jordanKingdom: "المملكة الأردنية الهاشمية",
      languageSwitch: "English",
      // Activity translations
      hotAirBalloon: "البالون",
      lunchInPetra: "غداء البترا",
      balloonsOverRum: "بالونات وادي رم",
      sunsetSafariTour: "جولة السفاري لغروب الشمس",
      sunriseCamelTour: "جولة الجمال لشروق الشمس",
      starGazing: "مراقبة النجوم",
      parasailing: "البراشوت",
      jetSki: "جيت سكي",
      diving: "الغطس",
      waterPark: "الألعاب المائية",
      // Time and duration translations
      minutes: "دقيقة",
      hour: "ساعة",
      hours: "ساعات",
      daily: "يومياً",
      sunrise: "مع شروق الشمس",
      departure: "الانطلاق",
      fromCamps: "من المخيمات",
      // Descriptions and details
      altitude: "ارتفاع",
      flight: "رحلة جوية",
      people: "شخص",
      perCar: "للسيارة",
      perPerson: "للشخص",
      dependingOnCamp: "حسب موقع المخيم",
      mainSites: "مواقع رئيسية",
      hollywoodFilming: "أماكن تصوير أفلام هوليوود، مكياج العرب، النقوش، الوجه الصخري، الكثبان الرملية، درب لورانس العرب",
      telescopes: "أنواع تيليسكوب",
      photographyIncluded: "شامل تصوير",
      weightLimit: "حد الوزن",
      ageLimit: "حد العمر",
      above: "فوق",
      years: "سنة",
      upTo: "لغاية",
      kg: "كيلو",
      location: "الموقع",
      coralChain: "السلسلة المرجانية",
      requirements: "المتطلبات",
      noRespiratoryHeart: "خلو المشارك من مشاكل تنفسية وقلبية وعمليات مؤخراً",
      includedServices: "شاملة التصوير والنقل وفيديو قصير لكل مشارك، يتوفر لباس شرعي للمحجبات، يتوفر مدربة غطس",
      operatingHours: "ساعات العمل",
      attractions: "معالم",
      games: "لعبة",
      windSurf: "وين سيرف",
      // Price categories
      foreign: "أجنبي",
      jordanian: "أردني",
      child: "طفل",
      nonJordanian: "غير أردني",
      adult: "بالغ",
      single: "فردي",
      double: "مزدوج",
      triple: "ثلاثي",
      privateCar: "سيارة خاصة",
      withLunch: "مع الغداء",
      noLunch: "بدون غداء",
      halfPrice: "نصف السعر",
      under5Free: "الأجانب والعرب تحت خمس سنوات مجاناً",
      // Additional labels
      min: "د",
      am: "ص",
      pm: "م",
      to: "إلى",
      and: "و",
      // Navigation and contact
      backToTop: "العودة للأعلى",
      destinations: {
        petra: { name: "البترا" },
        wadirum: { name: "وادي رم" },
        aqaba: { name: "العقبة" }
      }
    }
  };

  const t = translations[language];

  const destinations = {
    petra: {
      name: t.destinations.petra.name,
      icon: Mountain,
      color: 'from-amber-600 via-red-700 to-rose-800',
      accentColor: 'from-amber-500 to-red-600',
      video: 'https://www.youtube.com/embed/c2JOrcVQtQM',
      pattern: 'petra-pattern',
      activities: [
        {
          title: t.hotAirBalloon,
          duration: `20 ${t.minutes}`,
          height: `250-300${t.m} ${t.altitude}`,
          prices: {
            [t.foreign]: '28 JD',
            [t.jordanian]: '15 JD',
            [`${t.child} ${t.foreign}`]: `15 JD (5-12 ${t.years})`,
            [`${t.child} ${t.jordanian}`]: `8 JD (5-12 ${t.years})`
          },
          note: t.under5Free
        },
        {
          title: t.lunchInPetra,
          prices: {
            [t.adult]: '13 JD',
            [t.child]: `8 JD (5-12 ${t.years})`
          }
        }
      ]
    },
    wadirum: {
      name: t.destinations.wadirum.name,
      icon: Sun,
      color: 'from-orange-600 via-red-600 to-yellow-700',
      accentColor: 'from-orange-500 to-red-500',
      video: 'https://www.youtube.com/embed/svn6Q1ElFj0',
      pattern: 'desert-pattern',
      activities: [
        {
          title: t.balloonsOverRum,
          time: `${t.daily} ${t.sunrise}`,
          duration: `45 ${t.min} ${t.flight}`,
          departure: `${t.departure} 4:15 ${t.am} ${t.fromCamps}`,
          capacity: `18 ${t.people}`,
          prices: {
            [t.nonJordanian]: '165 JD',
            [t.jordanian]: '140 JD'
          }
        },
        {
          title: t.sunsetSafariTour,
          duration: `2 ${t.hours}`,
          capacity: `6 ${t.people} ${t.perCar}`,
          prices: {
            [t.perPerson]: '8 JD',
            [t.privateCar]: '45 JD'
          },
          includes: `4 ${t.mainSites} (${t.hollywoodFilming})`
        },
        {
          title: t.sunriseCamelTour,
          duration: `1 ${t.hour}`,
          prices: {
            [t.perPerson]: `15-20 JD (${t.dependingOnCamp})`
          }
        },
        {
          title: t.starGazing,
          time: `${t.departure} 9:15 ${t.pm} ${t.fromCamps}`,
          duration: `1.5 ${t.hours}`,
          equipment: `4 ${t.telescopes}`,
          prices: {
            [t.adult]: '25 JD',
            [t.child]: `${t.halfPrice} (5-12 ${t.years})`
          },
          includes: t.photographyIncluded
        }
      ]
    },
    aqaba: {
      name: t.destinations.aqaba.name,
      icon: Waves,
      color: 'from-blue-700 via-teal-600 to-cyan-700',
      accentColor: 'from-blue-500 to-teal-500',
      video: 'https://www.youtube.com/embed/OqVROy0EXCI',
      pattern: 'wave-pattern',
      activities: [
        {
          title: t.parasailing,
          weightLimit: `${t.weightLimit}: 100-160 ${t.kg}`,
          prices: {
            [t.single]: '45 JD',
            [t.double]: '60 JD', 
            [t.triple]: '80 JD'
          }
        },
        {
          title: t.jetSki,
          ageLimit: `${t.ageLimit}: ${t.above} 18 ${t.years}`,
          weightLimit: `${t.weightLimit}: ${t.upTo} 120 ${t.kg}`,
          prices: {
            [`${t.single} 15${t.min}`]: '30 JD (15 min)',
            [`${t.double} 15${t.min}`]: '45 JD (15 min)',
            [`${t.single} 30${t.min}`]: '50 JD (30 min)',
            [`${t.double} 30${t.min}`]: '65 JD (30 min)'
          }
        },
        {
          title: t.diving,
          location: `${t.location}: ${t.coralChain}`,
          ageLimit: `${t.ageLimit}: ${t.above} 11 ${t.years}`,
          requirements: `${t.requirements}: ${t.noRespiratoryHeart}`,
          prices: {
            [t.adult]: '35 JD'
          },
          includes: t.includedServices
        },
        {
          title: t.waterPark,
          hours: `${t.operatingHours}: 9:00 ${t.am} - 7:00 ${t.pm}`,
          attractions: `26 ${t.games}, ${t.windSurf} (5 JD)`,
          prices: {
            [`${t.adult} ${t.withLunch}`]: '25 JD',
            [`${t.adult} ${t.noLunch}`]: '20 JD',
            [`${t.child} 3-12 ${t.withLunch}`]: '20 JD',
            [`${t.child} 3-12 ${t.noLunch}`]: '15 JD'
          }
        }
      ]
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const GeometricPattern = ({ type, className }) => {
    const patterns = {
      'petra-pattern': (
        <div className={`absolute inset-0 opacity-10 ${className}`}>
          <svg width="100%" height="100%" viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <pattern id="petra" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <polygon points="50,5 95,35 95,85 50,95 5,85 5,35" fill="currentColor" opacity="0.3"/>
                <polygon points="25,20 75,20 87.5,50 75,80 25,80 12.5,50" fill="currentColor" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#petra)"/>
          </svg>
        </div>
      ),
      'desert-pattern': (
        <div className={`absolute inset-0 opacity-10 ${className}`}>
          <svg width="100%" height="100%" viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <pattern id="desert" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M0,40 Q20,20 40,40 Q60,60 80,40 Q100,20 120,40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
                <circle cx="40" cy="40" r="8" fill="currentColor" opacity="0.3"/>
                <path d="M20,20 L60,20 L40,60 Z" fill="currentColor" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#desert)"/>
          </svg>
        </div>
      ),
      'wave-pattern': (
        <div className={`absolute inset-0 opacity-10 ${className}`}>
          <svg width="100%" height="100%" viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <pattern id="waves" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
                <path d="M0,25 Q25,0 50,25 Q75,50 100,25" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.4"/>
                <path d="M0,35 Q25,10 50,35 Q75,60 100,35" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)"/>
          </svg>
        </div>
      )
    };
    return patterns[type] || null;
  };

  const ActivityCard = ({ activity, destination }) => (
    <div className={`relative bg-gradient-to-br from-amber-50/20 to-white/10 backdrop-blur-lg rounded-3xl p-6 border-2 border-amber-300/30 hover:border-amber-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl group overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Traditional Islamic geometric border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-red-500 to-amber-500"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-red-500 to-amber-500"></div>
      
      {/* Geometric pattern overlay */}
      <GeometricPattern type={destination.pattern} className="text-amber-600" />
      
      <div className={`relative z-10 flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h3 className="text-xl font-bold text-amber-100 mb-2 font-serif">{activity.title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-6 h-6 text-amber-400 fill-current" />
          <Compass className="w-5 h-5 text-amber-300" />
        </div>
      </div>

      <div className={`space-y-3 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        {activity.duration && (
          <div className={`flex items-center text-amber-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Clock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{activity.duration}</span>
          </div>
        )}
        {activity.capacity && (
          <div className={`flex items-center text-amber-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Users className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{activity.capacity}</span>
          </div>
        )}
        {activity.includes && (
          <div className={`flex items-start text-amber-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Camera className={`w-4 h-4 mt-1 ${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} />
            <span className="text-sm font-medium leading-relaxed">{activity.includes}</span>
          </div>
        )}
        {activity.time && (
          <div className={`flex items-center text-amber-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Clock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{activity.time}</span>
          </div>
        )}
        {activity.departure && (
          <div className={`flex items-center text-amber-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <MapPin className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{activity.departure}</span>
          </div>
        )}
        {activity.equipment && (
          <div className={`flex items-center text-amber-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Camera className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{activity.equipment}</span>
          </div>
        )}
        {activity.weightLimit && (
          <div className={`flex items-center text-amber-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Users className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{activity.weightLimit}</span>
          </div>
        )}
        {activity.ageLimit && (
          <div className={`flex items-center text-amber-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Users className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{activity.ageLimit}</span>
          </div>
        )}
        {activity.location && (
          <div className={`flex items-center text-amber-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <MapPin className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{activity.location}</span>
          </div>
        )}
        {activity.requirements && (
          <div className={`flex items-start text-amber-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Star className={`w-4 h-4 mt-1 ${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} />
            <span className="text-sm font-medium leading-relaxed">{activity.requirements}</span>
          </div>
        )}
        {activity.hours && (
          <div className={`flex items-center text-amber-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Clock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{activity.hours}</span>
          </div>
        )}
        {activity.attractions && (
          <div className={`flex items-center text-amber-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Star className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{activity.attractions}</span>
          </div>
        )}
      </div>

      <div className="border-t-2 border-amber-400/30 pt-4 relative">
        <div className={`flex items-center mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <DollarSign className={`w-5 h-5 text-amber-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <span className="text-amber-100 font-bold text-lg font-serif">{t.prices}:</span>
        </div>
        <div className="grid grid-cols-1 gap-3 text-sm">
          {Object.entries(activity.prices || {}).map(([key, value]) => (
            <div key={key} className={`flex justify-between items-center p-2 bg-amber-900/20 rounded-lg border border-amber-500/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-amber-200 font-medium">
                {key}:
              </span>
              <span className="font-bold text-amber-300 text-lg">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {activity.note && (
        <div className="mt-4 p-4 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl border border-amber-500/40 backdrop-blur-sm">
          <p className="text-amber-100 text-sm font-medium leading-relaxed">{activity.note}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-amber-900 via-red-900 to-orange-900 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Traditional Jordanian Header Pattern */}
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-amber-600 via-red-600 via-amber-600 via-red-600 to-amber-600"></div>
      
      {/* Language Switcher - Made smaller on mobile */}
      <div className={`fixed top-6 z-50 ${isRTL ? 'left-3 md:left-6' : 'right-3 md:right-6'}`}>
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="bg-gradient-to-r from-amber-600 to-red-600 text-white px-3 py-2 md:px-6 md:py-3 rounded-full font-bold hover:from-amber-500 hover:to-red-500 transition-all duration-300 shadow-2xl border-2 border-amber-300/50 backdrop-blur-lg flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
        >
          <Globe className="w-4 h-4 md:w-5 md:h-5" />
          <span>{t.languageSwitch}</span>
        </button>
      </div>

      {/* Hero Section with Traditional Elements */}
      <div id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Traditional geometric background */}
        <div className="absolute inset-0">
          <GeometricPattern type="petra-pattern" className="text-amber-600 opacity-20" />
        </div>
        
        {/* Arabic/Islamic style decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-amber-400/30 rounded-full flex items-center justify-center">
          <Tent className="w-16 h-16 text-amber-400" />
        </div>
        <div className="absolute bottom-32 right-20 w-24 h-24 border-4 border-red-400/30 rounded-full flex items-center justify-center">
          <Compass className="w-12 h-12 text-red-400" />
        </div>
        
        <div className={`relative z-10 text-center px-4 max-w-6xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Traditional Arabic/Jordanian welcome */}
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-amber-300 font-serif mb-2">{t.welcomeGuest}</p>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto"></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-red-300 to-amber-300 mb-6 font-serif leading-tight">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-amber-200 mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
            {t.subtitle}
          </p>
          
          {/* Traditional Jordanian-style navigation - Made smaller on mobile */}
          <div className={`flex justify-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 md:space-x-6 flex-wrap gap-2 md:gap-4`}>
            {Object.keys(destinations).map((key) => {
              const dest = destinations[key];
              const Icon = dest.icon;
              return (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`px-4 py-2 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all duration-500 transform hover:scale-110 flex items-center space-x-2 md:space-x-3 border-2 backdrop-blur-lg text-sm md:text-base ${
                    activeSection === key
                      ? `bg-gradient-to-r ${dest.accentColor} text-white shadow-2xl border-amber-300 scale-110`
                      : 'bg-amber-900/30 text-amber-200 hover:bg-amber-800/40 border-amber-500/50'
                  } ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <Icon className="w-4 h-4 md:w-6 md:h-6" />
                  <span className="font-serif text-sm md:text-lg">{dest.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Destination Sections with Cultural Design */}
      {Object.entries(destinations).map(([key, destination]) => (
        <section
          key={key}
          id={key}
          className={`min-h-screen py-20 px-4 relative transition-all duration-1000 ${
            activeSection === key ? 'opacity-100' : 'opacity-70'
          }`}
        >
          {/* Traditional pattern background */}
          <GeometricPattern type={destination.pattern} className={`text-amber-600`} />
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header with Traditional Elements */}
            <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center justify-center mb-8">
                <div className={`p-4 md:p-6 rounded-full bg-gradient-to-r ${destination.accentColor} shadow-2xl border-4 border-amber-300/50 relative`}>
                  <destination.icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  {/* Traditional decorative corners */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-amber-300"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-amber-300"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-amber-300"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-amber-300"></div>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-red-300 mb-6 font-serif">
                {destination.name}
              </h2>
              
              {/* Traditional decorative line */}
              <div className="flex items-center justify-center mb-8">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-amber-500"></div>
                <div className="w-4 h-4 bg-amber-500 rotate-45 mx-4"></div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-amber-500"></div>
              </div>
              
              <div className={`flex items-center justify-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className={`w-5 h-5 md:w-6 md:h-6 text-amber-400 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <span className="text-lg md:text-xl text-amber-300 font-serif">{t.jordanKingdom}</span>
              </div>
            </div>

            {/* Video Section with Traditional Frame */}
            <div className="mb-16">
              <div className="relative max-w-4xl mx-auto">
                <div 
                  className="bg-gradient-to-br from-amber-900/40 to-red-900/40 backdrop-blur-xl rounded-3xl p-4 md:p-8 border-4 border-amber-400/40 relative overflow-hidden"
                  data-video-key={key}
                >
                  {/* Traditional corner decorations */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-amber-400"></div>
                  <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-amber-400"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-amber-400"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-amber-400"></div>
                  
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-300/50 relative">
                    {/* YouTube Player Container */}
                    <div
                      ref={el => videoRefs.current[key] = el}
                      className="w-full h-full"
                      id={`youtube-player-${key}`}
                    ></div>
                    
                    {/* Fallback iframe for when API is not loaded */}
                    {!youTubeReady && (
                      <iframe
                        src={`${destination.video}?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0`}
                        title={`${destination.name} Video`}
                        className="w-full h-full absolute top-0 left-0"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Activities Grid with Traditional Styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destination.activities.map((activity, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-700"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: activeSection === key ? 'slideInUp 0.8s ease-out forwards' : 'none'
                  }}
                >
                  <ActivityCard activity={activity} destination={destination} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}



      {/* Traditional bottom border */}
      <div className="h-4 bg-gradient-to-r from-amber-600 via-red-600 via-amber-600 via-red-600 to-amber-600"></div>

      {/* Hamburger Menu Button */}
      {scrollY > 100 && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`fixed bottom-4 z-50 p-3 bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-full shadow-2xl hover:from-amber-500 hover:to-red-500 transition-all duration-300 border-2 border-amber-300/50 backdrop-blur-lg ${isRTL ? 'left-4' : 'right-4'}`}
          title="Menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
            <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${sidebarOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${sidebarOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${sidebarOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        </button>
      )}

      {/* Sidebar Navigation */}
      <div className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-80 bg-gradient-to-b from-amber-900/95 to-red-900/95 backdrop-blur-xl border-l-4 ${isRTL ? 'border-r-4 border-l-0' : ''} border-amber-400/30 z-40 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          {/* Sidebar Header */}
          <div className={`flex items-center justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-2xl font-bold text-amber-200 font-serif">Menu</h3>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-amber-200 hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Options */}
          <div className="flex-1">
            {/* Back to Top */}
            <button
              onClick={() => {
                scrollToTop();
                setSidebarOpen(false);
              }}
              className={`w-full p-4 mb-4 bg-gradient-to-r from-amber-700/50 to-red-700/50 text-amber-200 rounded-xl hover:from-amber-600/60 hover:to-red-600/60 transition-all duration-300 flex items-center ${isRTL ? 'flex-row-reverse' : ''} space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="font-medium">{t.backToTop}</span>
            </button>

            {/* Destination Navigation */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-amber-300 mb-4 font-serif">Destinations</h4>
              {Object.keys(destinations).map((key) => {
                const dest = destinations[key];
                const Icon = dest.icon;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      scrollToSection(key);
                      setSidebarOpen(false);
                    }}
                    className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} ${
                      activeSection === key
                        ? `bg-gradient-to-r ${dest.accentColor} text-white shadow-lg`
                        : 'bg-amber-900/30 text-amber-200 hover:bg-amber-800/50 hover:text-amber-100'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium text-lg">{dest.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Traditional decorative footer */}
          <div className="pt-6 border-t-2 border-amber-400/30">
            <div className="text-center">
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mb-2"></div>
              <p className="text-amber-300 text-sm font-serif">{t.jordanKingdom}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .rtl {
          direction: rtl;
        }
        
        .ltr {
          direction: ltr;
        }
        
        /* Arabic font support */
        .font-serif {
          font-family: 'Times New Roman', 'Arial', 'Tahoma', serif;
        }
        
        /* Enhanced Arabic styling */
        [dir="rtl"] {
          text-align: right;
        }
        
        [dir="rtl"] .space-x-reverse > * + * {
          margin-right: 0.75rem;
          margin-left: 0;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar with Jordanian theme */
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #92400e, #dc2626);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f59e0b, #dc2626);
          border-radius: 6px;
          border: 2px solid #92400e;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #fbbf24, #ef4444);
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .space-x-2 > * + * {
            margin-left: 0.5rem;
          }
          
          [dir="rtl"] .space-x-reverse > * + * {
            margin-right: 0.5rem;
            margin-left: 0;
          }
        }
        
        /* Sidebar specific styles */
        @media (max-width: 640px) {
          .w-80 {
            width: 90vw;
            max-width: 320px;
          }
        }
        
        /* Hamburger animation */
        .hamburger-line {
          transform-origin: center;
        }
        
        /* Smooth sidebar transitions */
        .sidebar-enter {
          transform: translateX(100%);
        }
        
        .sidebar-enter-active {
          transform: translateX(0);
          transition: transform 300ms ease-in-out;
        }
        
        .sidebar-exit {
          transform: translateX(0);
        }
        
        .sidebar-exit-active {
          transform: translateX(100%);
          transition: transform 300ms ease-in-out;
        }
        
        [dir="rtl"] .sidebar-enter {
          transform: translateX(-100%);
        }
        
        [dir="rtl"] .sidebar-exit-active {
          transform: translateX(-100%);
        }
      `}</style>
    </div>
  );
};

export default JordanToursWebsite;