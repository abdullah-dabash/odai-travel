import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Star, Clock, Users, DollarSign, Camera, Sun, Mountain, Waves, Globe, Tent, Compass } from 'lucide-react';

const JordanToursWebsite = () => {
  const [activeSection, setActiveSection] = useState('petra');
  const [scrollY, setScrollY] = useState(0);
  const [language, setLanguage] = useState('en');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play video when scrolled into view
  useEffect(() => {
    const observerOptions = {
      threshold: 0.6,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const videoKey = entry.target.getAttribute('data-video-key');
        
        if (entry.isIntersecting) {
          setPlayingVideo(videoKey);
        } else if (playingVideo === videoKey) {
          setPlayingVideo(null);
        }
      });
    }, observerOptions);

    // Observe all video containers
    setTimeout(() => {
      const videoContainers = document.querySelectorAll('[data-video-key]');
      videoContainers.forEach(container => {
        observer.observe(container);
      });
    }, 500);

    return () => observer.disconnect();
  }, [playingVideo]);

  const isRTL = language === 'ar';

  const translations = {
    en: {
      title: "Jordan Summer Adventures",
      subtitle: "Experience the magic of Jordan's summer destinations with crystal-clear waters, golden deserts, and ancient wonders",
      prices: "Prices",
      duration: "Duration",
      capacity: "Capacity",
      includes: "Includes",
      note: "Note",
      welcomeGuest: "Welcome to Paradise",
      jordanKingdom: "The Hashemite Kingdom of Jordan",
      languageSwitch: "العربية",
      backToTop: "Back to Top",
      
      // Time and units
      minutes: "minutes",
      hour: "hour",
      hours: "hours",
      daily: "Daily",
      sunrise: "at sunrise",
      departure: "Departure",
      fromCamps: "from camps",
      altitude: "altitude",
      flight: "flight",
      people: "people",
      perCar: "per car",
      perPerson: "per person",
      dependingOnCamp: "depending on camp location",
      mainSites: "main sites",
      min: "min",
      am: "AM",
      pm: "PM",
      to: "to",
      and: "and",
      above: "Above",
      years: "years",
      upTo: "Up to",
      kg: "kg",
      
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
      withFood: "With Food",
      noFood: "No Food",
      halfPrice: "Half price",
      under5Free: "Under 5 years free for foreigners and Arabs",
      under3Free: "Under 3 years free",
      under4Free: "Under 4 years free",
      
      destinations: {
        petra: { name: "Petra" },
        wadirum: { name: "Wadi Rum" },
        aqaba: { name: "Aqaba" }
      },

      // Petra Activities
      hotAirBalloon: "Hot Air Balloon",
      lunchInPetra: "Lunch in Petra",
      
      // Wadi Rum Activities
      balloonsOverRum: "Balloons over Rum",
      sunsetSafariTour: "Sunset Safari Tour",
      sunriseCamelTour: "Sunrise Camel Tour",
      fourWDCars: "AQABA ATV Round 45- 60 min",
      wadiRumZipLine: "Wadi Rum ZipLine",
      starGazing: "Star Gazing",
      sandBoard: "Wadi Rum ATV",
      
      // Aqaba Activities
      parasailing: "Parasailing",
      jetSki: "Jet Ski",
      knobTube: "Sofa Tube",
      bananaTube: "Banana Tube",
      diving: "Diving",
      seaToursDay: "Day Boat Cruise",
      seaToursEvening: "Evening Boat Cruise",
      sunsetTour: "Sunset Boat Cruise",
      speedBoat: "Speed Boat",
      submarine: "Submarine",
      snorkeling: "Snorkeling",
      publicSecurityChalets: "Public Security Chalets",
      waterPark: "Water Park",
      carJetSki: "Car Jet Ski",
      helmetDiving: "Sea Trek Diving",
      
      // Detailed descriptions
      hollywoodFilming: "Hollywood filming locations, Arab makeup, inscriptions, rock face, sand dunes, Lawrence of Arabia trail",
      telescopes: "types of telescopes",
      photographyIncluded: "Photography included",
      weightLimit: "Weight limit",
      ageLimit: "Age limit",
      location: "Location",
      coralChain: "Coral Chain",
      requirements: "Requirements",
      noRespiratoryHeart: "No respiratory/heart problems, no recent surgeries",
      includedServices: "Photography, transport, short video, modest clothing for veiled women, female diving instructor available",
      operatingHours: "Operating hours",
      attractions: "attractions",
      games: "games",
      buffetDinner: "Buffet dinner",
      softDrinks: "Soft drinks included",
      transportIncluded: "Transport included",
      transportNotIncluded: "Transport not included",
      groupTransport: "Group transport 10 JD"
    },
    ar: {
      title: "مغامرات الأردن الصيفية",
      subtitle: "استمتع بسحر وجهات الأردن الصيفية مع المياه الكريستالية والصحاري الذهبية والعجائب القديمة",
      prices: "الأسعار",
      duration: "المدة",
      capacity: "السعة",
      includes: "يشمل",
      note: "ملاحظة",
      welcomeGuest: "أهلاً وسهلاً ",
      jordanKingdom: "المملكة الأردنية الهاشمية",
      languageSwitch: "English",
      backToTop: "العودة للأعلى",
      
      // Time and units
      minutes: "دقيقة",
      hour: "ساعة",
      hours: "ساعات",
      daily: "يومياً",
      sunrise: "مع شروق الشمس",
      departure: "الانطلاق",
      fromCamps: "من المخيمات",
      altitude: "ارتفاع",
      flight: "رحلة جوية",
      people: "شخص",
      perCar: "للسيارة",
      perPerson: "للشخص",
      dependingOnCamp: "حسب موقع المخيم",
      mainSites: "مواقع رئيسية",
      min: "د",
      am: "ص",
      pm: "م",
      to: "إلى",
      and: "و",
      above: "فوق",
      years: "سنة",
      upTo: "لغاية",
      kg: "كيلو",
      
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
      withFood: "مع الأكل",
      noFood: "بدون الأكل",
      halfPrice: "نصف السعر",
      under5Free: "الأجانب والعرب تحت خمس سنوات مجاناً",
      under3Free: "تحت ثلاث سنوات مجاناً",
      under4Free: "تحت أربع سنوات مجاناً",
      
      destinations: {
        petra: { name: "البترا" },
        wadirum: { name: "وادي رم" },
        aqaba: { name: "العقبة" }
      },

      // Petra Activities
      hotAirBalloon: "البالون",
      lunchInPetra: "غداء البترا",
      
      // Wadi Rum Activities
      balloonsOverRum: "بالونات وادي رم",
      sunsetSafariTour: "جولة السفاري لغروب الشمس",
      sunriseCamelTour: "جولة الجمال لشروق الشمس",
      fourWDCars: "Round 45- 60 min سيارات الدفع الرباعي",
      wadiRumZipLine: "زيب لاين وادي رم",
      starGazing: "مراقبة النجوم",
      sandBoard: "التزلج على الرمال",
      
      // Aqaba Activities
      parasailing: "البراشوت",
      jetSki: "جيت سكي",
      knobTube: "سوفا تيوب",
      bananaTube: "بنانا تيوب",
      diving: "الغطس",
      seaToursDay: "جولات اليخت النهارية",
      seaToursEvening: "جولات اليخت المسائية",
      sunsetTour: "جولات اليخت الغروب",
      speedBoat: "سبيد بوت",
      submarine: "الغواصة",
      snorkeling: "سنوركلينغ",
      publicSecurityChalets: "شاليهات الأمن العام",
      waterPark: "الحديقة المائية",
      carJetSki: "سيارة جيت سكي",
      helmetDiving: "غوص بخوذة",
      
      // Detailed descriptions
      hollywoodFilming: "أماكن تصوير أفلام هوليوود، مكياج العرب، النقوش، الوجه الصخري، الكثبان الرملية، درب لورانس العرب",
      telescopes: "أنواع تيليسكوب",
      photographyIncluded: "شامل تصوير",
      weightLimit: "حد الوزن",
      ageLimit: "حد العمر",
      location: "الموقع",
      coralChain: "السلسلة المرجانية",
      requirements: "المتطلبات",
      noRespiratoryHeart: "خلو المشارك من مشاكل تنفسية وقلبية وعمليات مؤخراً",
      includedServices: "شاملة التصوير والنقل وفيديو قصير لكل مشارك، يتوفر لباس شرعي للمحجبات، يتوفر مدربة غطس",
      operatingHours: "ساعات العمل",
      attractions: "معالم",
      games: "لعبة",
      buffetDinner: "وجبة عشاء بوفيه مفتوح",
      softDrinks: "شامل المشروبات الباردة",
      transportIncluded: "شامل النقل",
      transportNotIncluded: "غير شامل النقل",
      groupTransport: "التوصيل 10 دنانير على المجموعة"
    }
  };

  const t = translations[language];

  const destinations = {
    petra: {
      name: t.destinations.petra.name,
      icon: Mountain,
      color: 'from-orange-400 to-red-500',
      accentColor: 'from-orange-500 to-red-600',
      activities: [
        {
          id: 'petra-balloon',
          title: t.hotAirBalloon,
          video: 'https://youtu.be/8LjYA_mhlPY?si=7vjHHax58l8WCfKo',
          duration: `20 ${t.minutes}`,
          altitude: `250-300m ${t.altitude}`,
          prices: {
            [t.foreign]: '28 JD',
            [t.jordanian]: '15 JD',
            [`${t.child} ${t.foreign} (5-12 ${t.years})`]: '15 JD',
            [`${t.child} ${t.jordanian} (5-12 ${t.years})`]: '8 JD'
          },
          note: t.under5Free
        },
        {
          id: 'petra-lunch',
          title: t.lunchInPetra,
          video: 'https://youtu.be/wJ9t1bDKNto?si=Jmz7jPNUtRsur9MV',
          prices: {
            [t.adult]: '13 JD',
            [`${t.child} (5-12 ${t.years})`]: '8 JD'
          }
        }
      ]
    },
    wadirum: {
      name: t.destinations.wadirum.name,
      icon: Sun,
      color: 'from-yellow-400 to-orange-500',
      accentColor: 'from-yellow-500 to-orange-600',
      activities: [
        {
          id: 'wadirum-balloons',
          title: t.balloonsOverRum,
          video: 'https://youtube.com/shorts/fHvpZOMgoEs?si=PiAUuDZsAnV3YZa6',
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
          id: 'wadirum-safari',
          title: t.sunsetSafariTour,
          video: 'https://youtu.be/S-PdeY4fXcE?si=ovh1MpahR0R1vSN9',
          duration: `2 ${t.hours}`,
          capacity: `6 ${t.people} ${t.perCar}`,
          prices: {
            [t.perPerson]: '8 JD',
            [t.privateCar]: '45 JD'
          },
          includes: `4 ${t.mainSites} (${t.hollywoodFilming})`
        },
        {
          id: 'wadirum-camel',
          title: t.sunriseCamelTour,
          video: 'https://youtu.be/ZdLrE7Az2uY?si=vBwyPymnGzu7O_vR',
          duration: `1 ${t.hour}`,
          prices: {
            [t.perPerson]: `15-20 JD (${t.dependingOnCamp})`
          }
        },
  
        {
          id: 'wadirum-zipline',
          title: t.wadiRumZipLine,
          video: 'https://youtu.be/S6hVO1IuvKY?si=IaxbQVmOeHQSn63c',
          prices: {
            [t.jordanian]: '10 JD',
            [t.nonJordanian]: '15 JD'
          },
          note: t.transportNotIncluded
        },
        {
          id: 'wadirum-stargazing',
          title: t.starGazing,
          video: 'https://youtu.be/N0UKYharhYE?si=8lY1l0wZEu6FfLVE',
          time: `${t.departure} 9:15 ${t.pm} ${t.fromCamps}`,
          duration: `1.5 ${t.hours}`,
          equipment: `4 ${t.telescopes}`,
          prices: {
            [t.adult]: '25 JD',
            [`${t.child} (5-12 ${t.years})`]: `${t.halfPrice}`
          },
          includes: `${t.photographyIncluded}, ${t.transportIncluded}`
        },
        {
          id: 'wadirum-sandboard',
          title: t.sandBoard,
          video: ' https://youtu.be/x-gftJsnuwk?si=xS5HFOzyxbI0PylL',
          prices: {
            [t.perPerson]: '35 JD'
          }
        }
      ]
    },
    aqaba: {
      name: t.destinations.aqaba.name,
      icon: Waves,
      color: 'from-blue-400 to-cyan-500',
      accentColor: 'from-blue-500 to-cyan-600',
      activities: [
        {
          id: 'aqaba-parasailing',
          title: t.parasailing,
          video: 'https://youtube.com/shorts/pSseL3mSqf4?si=yYoM3h05Fb4LaKJT',
          weightLimit: `${t.weightLimit}: 100-160 ${t.kg}`,
          prices: {
            [t.single]: '45 JD',
            [t.double]: '60 JD',
            [t.triple]: '80 JD'
          }
        },
        {
          id: 'wadirum-4wd',
          title: t.fourWDCars,
          video: 'https://youtube.com/shorts/L-2j2LBzic4?si=CLo61-hw2bdJyl1P',
          prices: {
            [t.perPerson]: '35 JD'
          },
          note: t.transportNotIncluded
        },
        {
          id: 'aqaba-jetski',
          title: t.jetSki,
          video: 'https://youtube.com/shorts/hhdLMvYBxW4?si=70ZhNy1kyLVHhbi-',
          ageLimit: `${t.ageLimit}: ${t.above} 18 ${t.years}`,
          weightLimit: `${t.weightLimit}: ${t.upTo} 120 ${t.kg}`,
          prices: {
            [`${t.single} 15${t.min}`]: '30 JD',
            [`${t.double} 15${t.min}`]: '45 JD',
            [`${t.single} 30${t.min}`]: '50 JD',
            [`${t.double} 30${t.min}`]: '65 JD'
          }
        },
        {
          id: 'aqaba-knobtube',
          title: t.knobTube,
          video: 'https://youtube.com/shorts/wqL9Tl78npM?si=CUCgmslWHHmCgn7N',
          capacity: '2-4 ' + t.people,
          duration: '8-10 ' + t.minutes,
          prices: {
            [t.perPerson]: '10 JD'
          }
        },
        {
          id: 'aqaba-bananatube',
          title: t.bananaTube,
          video: 'https://youtu.be/iJ2kXEnt2cE?si=_9MHDBtlPzVMXrJT',
          capacity: '3-10 ' + t.people,
          duration: '8-10 ' + t.minutes,
          prices: {
            [t.perPerson]: '9 JD'
          }
        },
        {
          id: 'aqaba-diving',
          title: t.diving,
          video: 'https://youtube.com/shorts/F_F-kL2C0-Y?si=4LKRLHHamqAjR0YB',
          location: `${t.location}: ${t.coralChain}`,
          ageLimit: `${t.ageLimit}: ${t.above} 11 ${t.years}`,
          requirements: `${t.requirements}: ${t.noRespiratoryHeart}`,
          prices: {
            [t.adult]: '35 JD'
          },
          includes: t.includedServices
        },
        {
          id: 'aqaba-seatours-day',
          title: t.seaToursDay,
          video: 'https://youtube.com/shorts/B2KlLqMyrbc?si=7smVgv0658o0e0BZ',
          duration: `1.5 ${t.hours}`,
          prices: {
            [`${t.adult} ${t.withLunch}`]: '16 JD',
            [`${t.adult} ${t.noLunch}`]: '12 JD',
            [`${t.child} 4-11 ${t.withLunch}`]: '12 JD',
            [`${t.child} 4-11 ${t.noLunch}`]: '8 JD'
          },
          note: `${t.under4Free}: 1 JD only, ${t.softDrinks}`
        },
        {
          id: 'aqaba-seatours-evening',
          title: t.seaToursEvening,
          video: 'https://youtube.com/shorts/mD2gNjERTp8?si=meZvp8C36iS3s9PG',
          duration: `2 ${t.hours}`,
          location: 'Ayla Oasis',
          prices: {
            [`${t.adult} Fish Fillet`]: '20 JD',
            [`${t.adult} Fish Denis`]: '25 JD',
            [`${t.adult} ${t.noFood}`]: '15 JD',
            [`${t.child} 4-11 ${t.withFood}`]: '15 JD',
            [`${t.child} 4-11 Denis`]: '20 JD',
            [`${t.child} 4-11 ${t.noFood}`]: '10 JD'
          },
          note: t.under4Free
        },
        {
          id: 'aqaba-sunset',
          title: t.sunsetTour,
          video: 'https://youtube.com/shorts/u7OnCFqDBh0?si=1NgKVPuJ_TWtV_2f',
          duration: `2 ${t.hours}`,
          location: 'Ayla Oasis',
          prices: {
            [`${t.adult} ${t.buffetDinner}`]: '20 JD'
          }
        },
        {
          id: 'aqaba-speedboat',
          title: t.speedBoat,
          video: 'https://youtube.com/shorts/l0js93rb0_E?si=I8bQ85Ce8pSqqh7t',
          capacity: `${t.upTo} 6 ${t.people}`,
          prices: {
            [`15 ${t.min}`]: '35 JD',
            [`30 ${t.min}`]: '70 JD'
          }
        },
        {
          id: 'aqaba-submarine',
          title: t.submarine,
          video: 'https://youtube.com/shorts/WJh7thSAflY?si=cfKadsCZQbo1MrKy',
          duration: `3 ${t.hours}`,
          prices: {
            [`${t.adult} ${t.withFood}`]: '25 JD',
            [`${t.adult} ${t.noFood}`]: '20 JD',
            [`${t.child} 4-11 ${t.withFood}`]: '15 JD',
            [`${t.child} 4-11 ${t.noFood}`]: '10 JD'
          },
          note: `${t.under4Free}: 1 JD only`
        },
        {
          id: 'aqaba-snorkeling',
          title: t.snorkeling,
          video: 'https://youtu.be/XV9KIdh2EP0?si=bsCGj2L8Skglq-UF',
          prices: {
            ['Free Snorkeling']: '20 JD',
            ['With Guide']: '25 JD'
          }
        },
        {
          id: 'aqaba-chalets',
          title: t.publicSecurityChalets,
          video: 'https://youtube.com/shorts/rjGRuY3mmVI?si=F21kbmm8D81RjHrp',
          prices: {
            [t.adult]: '10 JD',
            [`${t.child} 5-10 ${t.years}`]: '5 JD'
          },
          note: `${t.under5Free}, ${t.groupTransport}`
        },
        {
          id: 'aqaba-waterpark',
          title: t.waterPark,
          video: 'https://youtu.be/T_n40BsUQ1I?feature=shared',
          hours: `${t.operatingHours}: 9:00 ${t.am} - 7:00 ${t.pm}`,
          attractions: `26 ${t.games}, Wind Surf (5 JD)`,
          prices: {
            [`${t.adult} ${t.withLunch}`]: '25 JD',
            [`${t.adult} ${t.noLunch}`]: '20 JD',
            [`${t.child} 3-12 ${t.withLunch}`]: '20 JD',
            [`${t.child} 3-12 ${t.noLunch}`]: '15 JD'
          },
          note: t.under3Free
        },
        {
          id: 'aqaba-carjetski',
          title: t.carJetSki,
          video: 'https://youtube.com/shorts/teogJCFbqTo?si=SxJat1r2G294COM0',
          duration: `1 ${t.hour}`,
          prices: {
            [t.perPerson]: '120 JD'
          }
        },
        {
          id: 'aqaba-helmetdiving',
          title: t.helmetDiving,
          video: 'https://youtube.com/shorts/YVeXBLJu_eE?si=0KTTS5ZwnN9bBGfM',
          depth: '4m',
          prices: {
            [t.perPerson]: '35 JD'
          },
          note: t.transportNotIncluded
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

  const ActivityCard = ({ activity, destination }) => {
    const isPlaying = playingVideo === activity.id;
    const [userClicked, setUserClicked] = useState(false);
    
    const handleVideoClick = () => {
      setUserClicked(true);
      setPlayingVideo(activity.id);
    };

    // Enhanced video ID extraction that handles YouTube Shorts
    const extractVideoId = (url) => {
      if (!url) return null;
      
      // Handle different YouTube URL formats
      const patterns = [
        // YouTube Shorts: https://youtube.com/shorts/VIDEO_ID or https://www.youtube.com/shorts/VIDEO_ID
        /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/,
        // Regular YouTube: https://youtu.be/VIDEO_ID
        /(?:youtu\.be\/)([a-zA-Z0-9_-]+)/,
        // Regular YouTube: https://www.youtube.com/watch?v=VIDEO_ID
        /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/,
        // Embed format: https://www.youtube.com/embed/VIDEO_ID
        /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
      ];
      
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
      
      return null;
    };

    const videoId = extractVideoId(activity.video);

    return (
      <div className={`bg-white rounded-2xl shadow-lg border-4 border-yellow-400 hover:border-yellow-500 transition-all duration-300 hover:shadow-xl overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Video Section */}
        <div className="p-4 pb-0">
          <div 
            className="relative rounded-xl overflow-hidden shadow-md border-2 border-yellow-300 cursor-pointer group"
            data-video-key={activity.id}
            onClick={handleVideoClick}
          >
            <div className="aspect-video">
              {(isPlaying && userClicked && videoId) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&loop=1&playlist=${videoId}`}
                  title={activity.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full bg-gray-900">
                  {videoId ? (
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium opacity-75">{activity.title}</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300">
                    <div className="bg-red-600 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Video status indicator */}
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
              {isPlaying ? (
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              ) : (
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <destination.icon className="w-5 h-5 text-orange-500" />
            </div>
          </div>

          <div className={`space-y-3 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {activity.duration && (
              <div className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-600`} />
                <span className="text-sm font-medium">{activity.duration}</span>
              </div>
            )}
            {activity.capacity && (
              <div className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Users className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-600`} />
                <span className="text-sm font-medium">{activity.capacity}</span>
              </div>
            )}
            {activity.includes && (
              <div className={`flex items-start text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Camera className={`w-4 h-4 mt-1 ${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0 text-yellow-600`} />
                <span className="text-sm font-medium leading-relaxed">{activity.includes}</span>
              </div>
            )}
            {activity.time && (
              <div className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-600`} />
                <span className="text-sm font-medium">{activity.time}</span>
              </div>
            )}
            {activity.departure && (
              <div className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-600`} />
                <span className="text-sm font-medium">{activity.departure}</span>
              </div>
            )}
            {activity.equipment && (
              <div className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Camera className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-600`} />
                <span className="text-sm font-medium">{activity.equipment}</span>
              </div>
            )}
            {activity.weightLimit && (
              <div className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Users className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-600`} />
                <span className="text-sm font-medium">{activity.weightLimit}</span>
              </div>
            )}
            {activity.ageLimit && (
              <div className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Users className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-600`} />
                <span className="text-sm font-medium">{activity.ageLimit}</span>
              </div>
            )}
            {activity.location && (
              <div className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-600`} />
                <span className="text-sm font-medium">{activity.location}</span>
              </div>
            )}
            {activity.requirements && (
              <div className={`flex items-start text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Star className={`w-4 h-4 mt-1 ${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0 text-yellow-600`} />
                <span className="text-sm font-medium leading-relaxed">{activity.requirements}</span>
              </div>
            )}
            {activity.hours && (
              <div className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-600`} />
                <span className="text-sm font-medium">{activity.hours}</span>
              </div>
            )}
            {activity.attractions && (
              <div className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Star className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-600`} />
                <span className="text-sm font-medium">{activity.attractions}</span>
              </div>
            )}
            {activity.altitude && (
              <div className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mountain className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-600`} />
                <span className="text-sm font-medium">{activity.altitude}</span>
              </div>
            )}
            {activity.depth && (
              <div className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Waves className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-600`} />
                <span className="text-sm font-medium">Depth: {activity.depth}</span>
              </div>
            )}
          </div>

          <div className="border-t-2 border-yellow-300 pt-4">
            <div className={`flex items-center mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <DollarSign className={`w-5 h-5 text-yellow-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span className="text-gray-900 font-bold text-lg">{t.prices}:</span>
            </div>
            <div className="grid grid-cols-1 gap-3 text-sm">
              {Object.entries(activity.prices || {}).map(([key, value]) => (
                <div key={key} className={`flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-700 font-medium">
                    {key}:
                  </span>
                  <span className="font-bold text-orange-600 text-lg">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {activity.note && (
            <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
              <p className="text-orange-800 text-sm font-medium leading-relaxed">{activity.note}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header pattern */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
      
      {/* Language Switcher */}
      <div className={`fixed top-6 z-50 ${isRTL ? 'left-3 md:left-6' : 'right-3 md:right-6'}`}>
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-3 py-2 md:px-6 md:py-3 rounded-full font-bold hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 shadow-lg border-2 border-yellow-300 flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
        >
          <Globe className="w-4 h-4 md:w-5 md:h-5" />
          <span>{t.languageSwitch}</span>
        </button>
      </div>

      {/* Hero Section */}
      <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-yellow-50 to-orange-50">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-yellow-400 rounded-full flex items-center justify-center">
          <Sun className="w-16 h-16 text-yellow-500" />
        </div>
        <div className="absolute bottom-32 right-20 w-24 h-24 border-4 border-blue-400 rounded-full flex items-center justify-center">
          <Waves className="w-12 h-12 text-blue-500" />
        </div>
        
        <div className={`relative z-10 text-center px-4 max-w-6xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Welcome */}
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-orange-600 font-bold mb-2">{t.welcomeGuest}</p>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
            {t.subtitle}
          </p>
          
          {/* Navigation */}
          <div className={`flex justify-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 md:space-x-6 flex-wrap gap-2 md:gap-4`}>
            {Object.keys(destinations).map((key) => {
              const dest = destinations[key];
              const Icon = dest.icon;
              return (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`px-4 py-2 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 md:space-x-3 border-2 text-sm md:text-base ${
                    activeSection === key
                      ? `bg-gradient-to-r ${dest.accentColor} text-white shadow-lg border-yellow-400 scale-105`
                      : 'bg-white text-gray-700 hover:bg-yellow-50 border-yellow-400 shadow-md'
                  } ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <Icon className="w-4 h-4 md:w-6 md:h-6" />
                  <span className="text-sm md:text-lg">{dest.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Destination Sections */}
      {Object.entries(destinations).map(([key, destination]) => (
        <section
          key={key}
          id={key}
          className="min-h-screen py-20 px-4 bg-gradient-to-br from-gray-50 to-yellow-50"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center justify-center mb-8">
                <div className={`p-4 md:p-6 rounded-full bg-gradient-to-r ${destination.accentColor} shadow-xl border-4 border-yellow-400`}>
                  <destination.icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-orange-600 mb-6">
                {destination.name}
              </h2>
              
              {/* Decorative line */}
              <div className="flex items-center justify-center mb-8">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-yellow-400"></div>
                <Sun className="w-8 h-8 text-yellow-500 mx-4" />
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-yellow-400"></div>
              </div>
              
              <div className={`flex items-center justify-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className={`w-5 h-5 md:w-6 md:h-6 text-orange-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <span className="text-lg md:text-xl text-gray-700 font-semibold">{t.jordanKingdom}</span>
              </div>
            </div>

            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destination.activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <ActivityCard activity={activity} destination={destination} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom border */}
      <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>

      {/* Hamburger Menu Button */}
      {scrollY > 100 && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`fixed bottom-4 z-50 p-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-full shadow-xl hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 border-2 border-yellow-300 ${isRTL ? 'left-4' : 'right-4'}`}
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
      <div className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-80 bg-white shadow-2xl border-l-4 ${isRTL ? 'border-r-4 border-l-0' : ''} border-yellow-400 z-40 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          {/* Sidebar Header */}
          <div className={`flex items-center justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-2xl font-bold text-gray-800">Menu</h3>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
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
              className={`w-full p-4 mb-4 bg-yellow-100 text-gray-800 rounded-xl hover:bg-yellow-200 transition-all duration-300 flex items-center ${isRTL ? 'flex-row-reverse' : ''} space-x-3 ${isRTL ? 'space-x-reverse' : ''} border border-yellow-300`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="font-medium">{t.backToTop}</span>
            </button>

            {/* Destination Navigation */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-orange-600 mb-4">Destinations</h4>
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
                        ? `bg-gradient-to-r ${dest.accentColor} text-white shadow-lg border border-yellow-400`
                        : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-orange-600 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium text-lg">{dest.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t-2 border-yellow-300">
            <div className="text-center">
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm font-medium">{t.jordanKingdom}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <style jsx>{`
        .rtl {
          direction: rtl;
        }
        
        .ltr {
          direction: ltr;
        }
        
        [dir="rtl"] {
          text-align: right;
        }
        
        [dir="rtl"] .space-x-reverse > * + * {
          margin-right: 0.75rem;
          margin-left: 0;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #fef3c7;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #fbbf24, #f59e0b);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f59e0b, #d97706);
        }
        
        @media (max-width: 768px) {
          .space-x-2 > * + * {
            margin-left: 0.5rem;
          }
          
          [dir="rtl"] .space-x-reverse > * + * {
            margin-right: 0.5rem;
            margin-left: 0;
          }
        }
        
        @media (max-width: 640px) {
          .w-80 {
            width: 90vw;
            max-width: 320px;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      `}</style>
    </div>
  );
};

export default JordanToursWebsite;