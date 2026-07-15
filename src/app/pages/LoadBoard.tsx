import { useState } from 'react';
import {
  Search,
  Download,
  List,
  Map as MapIcon,
  MapPin,
  X,
  Plus,
  Eye,
  Bookmark,
  ArrowRight,
  DollarSign,
  Repeat,
  Activity,
  Award
} from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

// Mock load data
const mockLoads = [
  {
    id: 'LD-3891',
    origin: 'Los Angeles, CA',
    originCoords: [-118.2437, 34.0522],
    destination: 'Chicago, IL',
    destCoords: [-87.6298, 41.8781],
    distance: '2,015 mi',
    rate: '$4,935',
    ratePerMile: '$2.45',
    equipment: 'Dry Van',
    broker: 'FreightWorks LLC',
    brokerPhone: '(555) 234-5678',
    pickupDate: 'Mar 14, 2026',
    weight: '45,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Electronics',
  },
  {
    id: 'LD-3892',
    origin: 'Houston, TX',
    originCoords: [-95.3698, 29.7604],
    destination: 'Atlanta, GA',
    destCoords: [-84.388, 33.749],
    distance: '789 mi',
    rate: '$2,209',
    ratePerMile: '$2.80',
    equipment: 'Reefer',
    broker: 'Chill Transport Co',
    brokerPhone: '(555) 345-6789',
    pickupDate: 'Mar 13, 2026',
    weight: '38,500 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Produce',
  },
  {
    id: 'LD-3893',
    origin: 'Seattle, WA',
    originCoords: [-122.3321, 47.6062],
    destination: 'Phoenix, AZ',
    destCoords: [-112.074, 33.4484],
    distance: '1,420 mi',
    rate: '$4,260',
    ratePerMile: '$3.00',
    equipment: 'Flatbed',
    broker: 'Western Freight Partners',
    brokerPhone: '(555) 456-7890',
    pickupDate: 'Mar 13, 2026',
    weight: '42,000 lbs',
    length: '48 ft',
    loadType: 'Full',
    commodity: 'Steel',
  },
  {
    id: 'LD-3894',
    origin: 'Miami, FL',
    originCoords: [-80.1918, 25.7617],
    destination: 'New York, NY',
    destCoords: [-74.006, 40.7128],
    distance: '1,281 mi',
    rate: '$3,971',
    ratePerMile: '$3.10',
    equipment: 'Dry Van',
    broker: 'Atlantic Logistics',
    brokerPhone: '(555) 567-8901',
    pickupDate: 'Mar 14, 2026',
    weight: '35,000 lbs',
    length: '53 ft',
    loadType: 'Partial',
    commodity: 'Consumer Goods',
  },
  {
    id: 'LD-3895',
    origin: 'Dallas, TX',
    originCoords: [-96.797, 32.7767],
    destination: 'Denver, CO',
    destCoords: [-104.9903, 39.7392],
    distance: '781 mi',
    rate: '$1,952',
    ratePerMile: '$2.50',
    equipment: 'Dry Van',
    broker: 'Central States Freight',
    brokerPhone: '(555) 678-9012',
    pickupDate: 'Mar 15, 2026',
    weight: '40,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'General Freight',
  },
  {
    id: 'LD-3901',
    origin: 'Columbus, OH',
    originCoords: [-82.9988, 39.9612],
    destination: 'Atlanta, GA',
    destCoords: [-84.3880, 33.7490],
    distance: '552 mi',
    rate: '$1,436',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'Pioneer Logistics',
    brokerPhone: '(555) 481-6294',
    pickupDate: 'Mar 22, 2026',
    weight: '43,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Consumer Goods',
  },
  {
    id: 'LD-3902',
    origin: 'Long Beach, CA',
    originCoords: [-118.1937, 33.7701],
    destination: 'Phoenix, AZ',
    destCoords: [-112.0740, 33.4484],
    distance: '373 mi',
    rate: '$970',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'BlueLine Logistics',
    brokerPhone: '(555) 615-9027',
    pickupDate: 'Mar 22, 2026',
    weight: '38,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Retail Goods',
  },
  {
    id: 'LD-3903',
    origin: 'Dallas, TX',
    originCoords: [-96.7970, 32.7767],
    destination: 'Denver, CO',
    destCoords: [-104.9903, 39.7392],
    distance: '794 mi',
    rate: '$2,065',
    ratePerMile: '$2.60',
    equipment: 'Flatbed',
    broker: 'Titan Freight',
    brokerPhone: '(555) 792-1543',
    pickupDate: 'Mar 23, 2026',
    weight: '45,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Steel Coils',
  },
  {
    id: 'LD-3904',
    origin: 'Houston, TX',
    originCoords: [-95.3698, 29.7604],
    destination: 'Memphis, TN',
    destCoords: [-90.0490, 35.1495],
    distance: '567 mi',
    rate: '$1,474',
    ratePerMile: '$2.60',
    equipment: 'Reefer',
    broker: 'FreightWorks LLC',
    brokerPhone: '(555) 308-6745',
    pickupDate: 'Mar 23, 2026',
    weight: '41,500 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Frozen Food',
  },
  {
    id: 'LD-3905',
    origin: 'Chicago, IL',
    originCoords: [-87.6298, 41.8781],
    destination: 'Indianapolis, IN',
    destCoords: [-86.1581, 39.7684],
    distance: '184 mi',
    rate: '$478',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'Prime Transport',
    brokerPhone: '(555) 947-2385',
    pickupDate: 'Mar 24, 2026',
    weight: '34,000 lbs',
    length: '53 ft',
    loadType: 'Partial',
    commodity: 'Paper Products',
  },
  {
    id: 'LD-3906',
    origin: 'Kansas City, MO',
    originCoords: [-94.5786, 39.0997],
    destination: 'Nashville, TN',
    destCoords: [-86.7816, 36.1627],
    distance: '555 mi',
    rate: '$1,388',
    ratePerMile: '$2.50',
    equipment: 'Power Only',
    broker: 'RoadLink Solutions',
    brokerPhone: '(555) 671-5408',
    pickupDate: 'Mar 24, 2026',
    weight: '20,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Containers',
  },
  {
    id: 'LD-3907',
    origin: 'Seattle, WA',
    originCoords: [-122.3321, 47.6062],
    destination: 'Portland, OR',
    destCoords: [-122.6765, 45.5231],
    distance: '174 mi',
    rate: '$470',
    ratePerMile: '$2.70',
    equipment: 'Dry Van',
    broker: 'Atlas Brokerage',
    brokerPhone: '(555) 552-1984',
    pickupDate: 'Mar 25, 2026',
    weight: '29,500 lbs',
    length: '53 ft',
    loadType: 'Partial',
    commodity: 'Electronics',
  },
  {
    id: 'LD-3908',
    origin: 'Savannah, GA',
    originCoords: [-81.0998, 32.0809],
    destination: 'Charlotte, NC',
    destCoords: [-80.8431, 35.2271],
    distance: '253 mi',
    rate: '$658',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'Eagle Freight',
    brokerPhone: '(555) 284-7350',
    pickupDate: 'Mar 25, 2026',
    weight: '36,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Furniture',
  },
  {
    id: 'LD-3909',
    origin: 'Miami, FL',
    originCoords: [-80.1918, 25.7617],
    destination: 'Jacksonville, FL',
    destCoords: [-81.6557, 30.3322],
    distance: '346 mi',
    rate: '$899',
    ratePerMile: '$2.60',
    equipment: 'Reefer',
    broker: 'BlueLine Logistics',
    brokerPhone: '(555) 716-8043',
    pickupDate: 'Mar 26, 2026',
    weight: '42,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Produce',
  },
  {
    id: 'LD-3910',
    origin: 'Phoenix, AZ',
    originCoords: [-112.0740, 33.4484],
    destination: 'Los Angeles, CA',
    destCoords: [-118.2437, 34.0522],
    distance: '373 mi',
    rate: '$970',
    ratePerMile: '$2.60',
    equipment: 'Step Deck',
    broker: 'Titan Freight',
    brokerPhone: '(555) 431-9278',
    pickupDate: 'Mar 26, 2026',
    weight: '44,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Machinery',
  },
  {
    id: 'LD-3911',
    origin: 'Atlanta, GA',
    originCoords: [-84.3880, 33.7490],
    destination: 'Dallas, TX',
    destCoords: [-96.7970, 32.7767],
    distance: '781 mi',
    rate: '$2,109',
    ratePerMile: '$2.70',
    equipment: 'Dry Van',
    broker: 'FreightWorks LLC',
    brokerPhone: '(555) 243-6187',
    pickupDate: 'Mar 27, 2026',
    weight: '44,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Consumer Goods',
  },
  {
    id: 'LD-3912',
    origin: 'Charlotte, NC',
    originCoords: [-80.8431, 35.2271],
    destination: 'Columbus, OH',
    destCoords: [-82.9988, 39.9612],
    distance: '431 mi',
    rate: '$1,121',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'BlueLine Logistics',
    brokerPhone: '(555) 621-5489',
    pickupDate: 'Mar 27, 2026',
    weight: '38,500 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Furniture',
  },
  {
    id: 'LD-3913',
    origin: 'Denver, CO',
    originCoords: [-104.9903, 39.7392],
    destination: 'Salt Lake City, UT',
    destCoords: [-111.8910, 40.7608],
    distance: '520 mi',
    rate: '$1,352',
    ratePerMile: '$2.60',
    equipment: 'Flatbed',
    broker: 'Titan Freight',
    brokerPhone: '(555) 392-7105',
    pickupDate: 'Mar 28, 2026',
    weight: '45,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Steel Coils',
  },
  {
    id: 'LD-3914',
    origin: 'Houston, TX',
    originCoords: [-95.3698, 29.7604],
    destination: 'Kansas City, MO',
    destCoords: [-94.5786, 39.0997],
    distance: '746 mi',
    rate: '$1,940',
    ratePerMile: '$2.60',
    equipment: 'Step Deck',
    broker: 'Prime Transport',
    brokerPhone: '(555) 805-4632',
    pickupDate: 'Mar 28, 2026',
    weight: '43,500 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Machinery',
  },
  {
    id: 'LD-3915',
    origin: 'Chicago, IL',
    originCoords: [-87.6298, 41.8781],
    destination: 'Memphis, TN',
    destCoords: [-90.0490, 35.1495],
    distance: '533 mi',
    rate: '$1,386',
    ratePerMile: '$2.60',
    equipment: 'Reefer',
    broker: 'RoadLink Solutions',
    brokerPhone: '(555) 514-7823',
    pickupDate: 'Mar 29, 2026',
    weight: '41,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Frozen Food',
  },
  {
    id: 'LD-3916',
    origin: 'Seattle, WA',
    originCoords: [-122.3321, 47.6062],
    destination: 'Denver, CO',
    destCoords: [-104.9903, 39.7392],
    distance: '1,331 mi',
    rate: '$3,461',
    ratePerMile: '$2.60',
    equipment: 'Power Only',
    broker: 'Atlas Brokerage',
    brokerPhone: '(555) 678-3405',
    pickupDate: 'Mar 29, 2026',
    weight: '24,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Shipping Containers',
  },
  {
    id: 'LD-3917',
    origin: 'Long Beach, CA',
    originCoords: [-118.1937, 33.7701],
    destination: 'Phoenix, AZ',
    destCoords: [-112.0740, 33.4484],
    distance: '373 mi',
    rate: '$970',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'Eagle Freight',
    brokerPhone: '(555) 742-5186',
    pickupDate: 'Mar 30, 2026',
    weight: '36,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Electronics',
  },
  {
    id: 'LD-3918',
    origin: 'Savannah, GA',
    originCoords: [-81.0998, 32.0809],
    destination: 'Nashville, TN',
    destCoords: [-86.7816, 36.1627],
    distance: '471 mi',
    rate: '$1,225',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'Pioneer Logistics',
    brokerPhone: '(555) 330-4721',
    pickupDate: 'Mar 30, 2026',
    weight: '39,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Paper Products',
  },
  {
    id: 'LD-3919',
    origin: 'Indianapolis, IN',
    originCoords: [-86.1581, 39.7684],
    destination: 'Atlanta, GA',
    destCoords: [-84.3880, 33.7490],
    distance: '534 mi',
    rate: '$1,388',
    ratePerMile: '$2.60',
    equipment: 'Conestoga',
    broker: 'BlueLine Logistics',
    brokerPhone: '(555) 592-8463',
    pickupDate: 'Mar 31, 2026',
    weight: '40,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Building Materials',
  },
  {
    id: 'LD-3920',
    origin: 'Phoenix, AZ',
    originCoords: [-112.0740, 33.4484],
    destination: 'Los Angeles, CA',
    destCoords: [-118.2437, 34.0522],
    distance: '373 mi',
    rate: '$970',
    ratePerMile: '$2.60',
    equipment: 'Hotshot',
    broker: 'Titan Freight',
    brokerPhone: '(555) 821-9074',
    pickupDate: 'Mar 31, 2026',
    weight: '14,000 lbs',
    length: '48 ft',
    loadType: 'Partial',
    commodity: 'Auto Parts',
  },
  {
    id: 'LD-3921',
    origin: 'Dallas, TX',
    originCoords: [-96.7970, 32.7767],
    destination: 'Houston, TX',
    destCoords: [-95.3698, 29.7604],
    distance: '239 mi',
    rate: '$622',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'FreightWorks LLC',
    brokerPhone: '(555) 437-2851',
    pickupDate: 'Apr 01, 2026',
    weight: '44,500 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Retail Goods',
  },
  {
    id: 'LD-3922',
    origin: 'Chicago, IL',
    originCoords: [-87.6298, 41.8781],
    destination: 'Columbus, OH',
    destCoords: [-82.9988, 39.9612],
    distance: '356 mi',
    rate: '$890',
    ratePerMile: '$2.50',
    equipment: 'Reefer',
    broker: 'BlueLine Logistics',
    brokerPhone: '(555) 684-3902',
    pickupDate: 'Apr 01, 2026',
    weight: '41,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Frozen Food',
  },
  {
    id: 'LD-3923',
    origin: 'Atlanta, GA',
    originCoords: [-84.3880, 33.7490],
    destination: 'Charlotte, NC',
    destCoords: [-80.8431, 35.2271],
    distance: '245 mi',
    rate: '$637',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'Prime Transport',
    brokerPhone: '(555) 752-1948',
    pickupDate: 'Apr 02, 2026',
    weight: '38,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Furniture',
  },
  {
    id: 'LD-3924',
    origin: 'Los Angeles, CA',
    originCoords: [-118.2437, 34.0522],
    destination: 'Las Vegas, NV',
    destCoords: [-115.1398, 36.1699],
    distance: '270 mi',
    rate: '$702',
    ratePerMile: '$2.60',
    equipment: 'Step Deck',
    broker: 'Titan Freight',
    brokerPhone: '(555) 526-8431',
    pickupDate: 'Apr 02, 2026',
    weight: '43,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Construction Equipment',
  },
  {
    id: 'LD-3925',
    origin: 'Memphis, TN',
    originCoords: [-90.0490, 35.1495],
    destination: 'Dallas, TX',
    destCoords: [-96.7970, 32.7767],
    distance: '452 mi',
    rate: '$1,175',
    ratePerMile: '$2.60',
    equipment: 'Flatbed',
    broker: 'RoadLink Solutions',
    brokerPhone: '(555) 813-4075',
    pickupDate: 'Apr 03, 2026',
    weight: '45,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Steel Coils',
  },
  {
    id: 'LD-3926',
    origin: 'Seattle, WA',
    originCoords: [-122.3321, 47.6062],
    destination: 'Salt Lake City, UT',
    destCoords: [-111.8910, 40.7608],
    distance: '841 mi',
    rate: '$2,187',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'Atlas Brokerage',
    brokerPhone: '(555) 298-6510',
    pickupDate: 'Apr 03, 2026',
    weight: '40,500 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Electronics',
  },
  {
    id: 'LD-3927',
    origin: 'Kansas City, MO',
    originCoords: [-94.5786, 39.0997],
    destination: 'Denver, CO',
    destCoords: [-104.9903, 39.7392],
    distance: '605 mi',
    rate: '$1,573',
    ratePerMile: '$2.60',
    equipment: 'Power Only',
    broker: 'Eagle Freight',
    brokerPhone: '(555) 742-3159',
    pickupDate: 'Apr 04, 2026',
    weight: '22,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Shipping Containers',
  },
  {
    id: 'LD-3928',
    origin: 'Savannah, GA',
    originCoords: [-81.0998, 32.0809],
    destination: 'Jacksonville, FL',
    destCoords: [-81.6557, 30.3322],
    distance: '140 mi',
    rate: '$364',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'Pioneer Logistics',
    brokerPhone: '(555) 604-7782',
    pickupDate: 'Apr 04, 2026',
    weight: '36,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Paper Products',
  },
  {
    id: 'LD-3929',
    origin: 'Indianapolis, IN',
    originCoords: [-86.1581, 39.7684],
    destination: 'Chicago, IL',
    destCoords: [-87.6298, 41.8781],
    distance: '184 mi',
    rate: '$478',
    ratePerMile: '$2.60',
    equipment: 'Conestoga',
    broker: 'BlueLine Logistics',
    brokerPhone: '(555) 927-4618',
    pickupDate: 'Apr 05, 2026',
    weight: '39,500 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Building Materials',
  },
  {
    id: 'LD-3930',
    origin: 'Phoenix, AZ',
    originCoords: [-112.0740, 33.4484],
    destination: 'Albuquerque, NM',
    destCoords: [-106.6504, 35.0844],
    distance: '419 mi',
    rate: '$1,089',
    ratePerMile: '$2.60',
    equipment: 'Hotshot',
    broker: 'FreightWorks LLC',
    brokerPhone: '(555) 381-5624',
    pickupDate: 'Apr 05, 2026',
    weight: '13,500 lbs',
    length: '48 ft',
    loadType: 'Partial',
    commodity: 'Auto Parts',
  },
  {
    id: 'LD-3931',
    origin: 'Los Angeles, CA',
    originCoords: [-118.2437, 34.0522],
    destination: 'Salt Lake City, UT',
    destCoords: [-111.8910, 40.7608],
    distance: '690 mi',
    rate: '$1,794',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'Titan Freight',
    brokerPhone: '(555) 742-9185',
    pickupDate: 'Apr 06, 2026',
    weight: '43,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Consumer Goods',
  },
  {
    id: 'LD-3932',
    origin: 'Houston, TX',
    originCoords: [-95.3698, 29.7604],
    destination: 'Atlanta, GA',
    destCoords: [-84.3880, 33.7490],
    distance: '793 mi',
    rate: '$2,062',
    ratePerMile: '$2.60',
    equipment: 'Reefer',
    broker: 'BlueLine Logistics',
    brokerPhone: '(555) 483-6174',
    pickupDate: 'Apr 06, 2026',
    weight: '41,500 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Frozen Food',
  },
  {
    id: 'LD-3933',
    origin: 'Dallas, TX',
    originCoords: [-96.7970, 32.7767],
    destination: 'Kansas City, MO',
    destCoords: [-94.5786, 39.0997],
    distance: '496 mi',
    rate: '$1,290',
    ratePerMile: '$2.60',
    equipment: 'Flatbed',
    broker: 'Prime Transport',
    brokerPhone: '(555) 256-8913',
    pickupDate: 'Apr 07, 2026',
    weight: '45,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Steel Coils',
  },
  {
    id: 'LD-3934',
    origin: 'Chicago, IL',
    originCoords: [-87.6298, 41.8781],
    destination: 'Nashville, TN',
    destCoords: [-86.7816, 36.1627],
    distance: '472 mi',
    rate: '$1,227',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'RoadLink Solutions',
    brokerPhone: '(555) 694-2740',
    pickupDate: 'Apr 07, 2026',
    weight: '38,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Paper Products',
  },
  {
    id: 'LD-3935',
    origin: 'Seattle, WA',
    originCoords: [-122.3321, 47.6062],
    destination: 'Boise, ID',
    destCoords: [-116.2023, 43.6150],
    distance: '496 mi',
    rate: '$1,290',
    ratePerMile: '$2.60',
    equipment: 'Power Only',
    broker: 'Atlas Brokerage',
    brokerPhone: '(555) 837-5206',
    pickupDate: 'Apr 08, 2026',
    weight: '24,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Shipping Containers',
  },
  {
    id: 'LD-3936',
    origin: 'Miami, FL',
    originCoords: [-80.1918, 25.7617],
    destination: 'Orlando, FL',
    destCoords: [-81.3792, 28.5383],
    distance: '236 mi',
    rate: '$614',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'FreightWorks LLC',
    brokerPhone: '(555) 314-9082',
    pickupDate: 'Apr 08, 2026',
    weight: '37,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Retail Goods',
  },
  {
    id: 'LD-3937',
    origin: 'Savannah, GA',
    originCoords: [-81.0998, 32.0809],
    destination: 'Memphis, TN',
    destCoords: [-90.0490, 35.1495],
    distance: '599 mi',
    rate: '$1,557',
    ratePerMile: '$2.60',
    equipment: 'Dry Van',
    broker: 'Pioneer Logistics',
    brokerPhone: '(555) 921-6537',
    pickupDate: 'Apr 09, 2026',
    weight: '39,500 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Electronics',
  },
  {
    id: 'LD-3938',
    origin: 'Charlotte, NC',
    originCoords: [-80.8431, 35.2271],
    destination: 'Indianapolis, IN',
    destCoords: [-86.1581, 39.7684],
    distance: '575 mi',
    rate: '$1,495',
    ratePerMile: '$2.60',
    equipment: 'Conestoga',
    broker: 'Eagle Freight',
    brokerPhone: '(555) 548-7310',
    pickupDate: 'Apr 09, 2026',
    weight: '40,000 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Building Materials',
  },
  {
    id: 'LD-3939',
    origin: 'Phoenix, AZ',
    originCoords: [-112.0740, 33.4484],
    destination: 'Denver, CO',
    destCoords: [-104.9903, 39.7392],
    distance: '822 mi',
    rate: '$2,137',
    ratePerMile: '$2.60',
    equipment: 'Step Deck',
    broker: 'BlueLine Logistics',
    brokerPhone: '(555) 673-2148',
    pickupDate: 'Apr 10, 2026',
    weight: '44,500 lbs',
    length: '53 ft',
    loadType: 'Full',
    commodity: 'Construction Equipment',
  },
  {
    id: 'LD-3940',
    origin: 'Long Beach, CA',
    originCoords: [-118.1937, 33.7701],
    destination: 'Las Vegas, NV',
    destCoords: [-115.1398, 36.1699],
    distance: '287 mi',
    rate: '$746',
    ratePerMile: '$2.60',
    equipment: 'Hotshot',
    broker: 'Titan Freight',
    brokerPhone: '(555) 409-8261',
    pickupDate: 'Apr 10, 2026',
    weight: '15,000 lbs',
    length: '48 ft',
    loadType: 'Partial',
    commodity: 'Auto Parts',
  }
];

type ViewMode = 'table' | 'map';

export function LoadBoard() {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [origin, setOrigin] = useState('');
  const [originRadius, setOriginRadius] = useState('150');
  const [destination, setDestination] = useState('');
  const [destinationRadius, setDestinationRadius] = useState('150');
  const [equipmentType, setEquipmentType] = useState('Dry Van');
  const [dateFrom, setDateFrom] = useState('3/13/2026');
  const [dateTo, setDateTo] = useState('3/15/2026');
  const [loadType, setLoadType] = useState('Full & Partial');
  const [length, setLength] = useState('53');
  const [weight, setWeight] = useState('');
  const [showTriHaulModal, setShowTriHaulModal] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<typeof mockLoads[0] | null>(null);
  const navigate = useNavigate();
  const [showClear, setShowClear] = useState(false)
  const [filteredData, setFilteredData] = useState(mockLoads)
  let finalData;


  const handleFilter = (searchOrigin: any, searchDestination: any) => {
    const data = mockLoads.filter((e) => {
      return e.origin == searchOrigin

    })
    finalData = data.filter((e) => {
      return e.destination == searchDestination
    })

    setFilteredData(finalData);
    setShowClear(true)

  }



  return (
    
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Search Loads
        </h1>
        <p className="text-sm text-gray-600">
          Find available freight loads and book shipments
        </p>
      </div>

      {/* Search Panel */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4 shadow-sm">
        {/* First Row */}
        <div className="grid grid-cols-8 gap-3 mb-3">
          {/* Origin with radius */}
          <div className="col-span-2">
            <label className="block text-xs text-gray-600 mb-1.5">
              Origin
            </label>
            <div className="flex gap-2">
              {/* <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="City, State"
              /> */}



              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {mockLoads.length > 0 ? (
                  mockLoads.map((load, index) => (
                    <option key={index} value={load.origin}>
                      {load.origin}
                    </option>
                  ))
                ) : (
                  <option value="Vans (Standard)">Vans</option>
                )}
              </select>

              {/* <input
                type="number"
                value={originRadius}
                onChange={(e) => setOriginRadius(e.target.value)}
                className="w-14 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-center"
                placeholder="150"
              /> */}
            </div>
          </div>

          {/* Empty swap column */}
          {/* <div className="flex items-end justify-center pb-2">
            <button className="p-1.5 text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div> */}

          {/* Destination with radius */}
          <div className="col-span-2">
            <label className="block text-xs text-gray-600 mb-1.5">
              Destination
            </label>
            <div className="flex gap-2">
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {mockLoads.length > 0 ? (
                  mockLoads.map((load, index) => (
                    <option key={index} value={load.origin}>
                      {load.origin}
                    </option>
                  ))
                ) : (
                  <option value="Vans (Standard)">Vans</option>
                )}
              </select>

              {/*  <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Destination"
              /> */}


              {/* <input
                type="number"
                value={destinationRadius}
                onChange={(e) => setDestinationRadius(e.target.value)}
                className="w-14 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-center"
                placeholder="150"
              /> */}
            </div>
          </div>

          {/* Date Range */}
          {/* <div className="col-span-2">
            <label className="block text-xs text-gray-600 mb-1.5">
              Date Range
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="6/11/2025"
              />
              <span className="text-gray-400">-</span>
              <input
                type="text"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="6/11/2025"
              />
            </div>
          </div> */}

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={() => {
                toast.success('Searching loads...')
                handleFilter(origin, destination);
              }
              }
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              SEARCH
            </button>
          </div>

         {showClear && <div className="flex items-end">
            <button
              onClick={() => {
                setFilteredData(mockLoads)
                setShowClear(false)
              }
              }
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              Clear
            </button>
          </div>}



        </div>

        {/* Second Row */}
        {/* <div className="grid grid-cols-8 gap-3">
          Equipment Type
          <div className="col-span-2">
            <label className="block text-xs text-gray-600 mb-1.5">
              Equipment Type*
            </label>
            <select
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="Vans (Standard)">Vans (Standard)</option>
              <option value="Dry Van">Dry Van</option>
              <option value="Reefer">Reefer</option>
              <option value="Flatbed">Flatbed</option>
            </select>
          </div>

          Load Type
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Load Type
            </label>
            <select
              value={loadType}
              onChange={(e) => setLoadType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="Full & Partial">Full & Partial</option>
              <option value="Full">Full</option>
              <option value="Partial">Partial</option>
            </select>
          </div>

          Length
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Length ft
            </label>
            <input
              type="text"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="53"
            />
          </div>

          Weight
          <div className="col-span-2">
            <label className="block text-xs text-gray-600 mb-1.5">
              Weight lbs
            </label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Weight lbs"
            />
          </div>

          More Options Button
          <div className="flex items-end">
            <button className="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              ⋮
            </button>
          </div>
        </div> */}


      </div>

      {/* Filter Options Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors text-xs font-medium flex items-center gap-1.5">
            LOAD REQUIREMENTS
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors text-xs font-medium flex items-center gap-1.5">
            SEARCH BACK - 24 HRS
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors text-xs font-medium flex items-center gap-1.5">
            COMPANY
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors text-xs font-medium flex items-center gap-1.5">
            PRIVATE LOADS
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button className="px-3 py-1.5 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors text-xs font-medium flex items-center gap-1.5">
            ONLY BOOKABLE
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="bg-white border border-gray-200 border-b-0 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="font-semibold text-gray-900">{filteredData.length} Results</span>
            <span className="text-gray-500 text-sm">
              +509 Similar Results
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by</span>
            <select className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
              <option value="age-newest">Age - Newest</option>
              <option value="rate-highest">Rate - Highest</option>
              <option value="rate-per-mile-highest">Rate per mile - Highest</option>
              <option value="trip-shortest">Trip - Shortest</option>
              <option value="trip-longest">Trip - Longest</option>
              <option value="pickup-soonest">Pick Up - Soonest</option>
              <option value="pickup-latest">Pick Up - Latest</option>
              <option value="company-name-a-z">Company Name - A to Z</option>
              <option value="company-name-z-a">Company Name - Z to A</option>
              <option value="weight-lightest">Weight - Lightest</option>
              <option value="weight-heaviest">Weight - Heaviest</option>
              <option value="credit-score-highest">Credit Score - Highest</option>
              <option value="days-to-pay-lowest">Days To Pay - Lowest</option>
              <option value="length-shortest">Length - Shortest</option>
              <option value="length-longest">Length - Longest</option>
              <option value="deadhead-o-shortest">Deadhead-O - Shortest</option>
              <option value="deadhead-d-shortest">Deadhead-D - Shortest</option>
              <option value="origin-city-a-z">Origin City - A to Z</option>
              <option value="origin-city-z-a">Origin City - Z to A</option>
              <option value="destination-city-a-z">Destination City - A to Z</option>
              <option value="destination-city-z-a">Destination City - Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Market Insights Bar - Below Results Header */}
      <div className="bg-white border-x border-gray-200 px-4 py-2.5">
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-gray-600 font-medium">LANE RATE</span>
          </div>

          <div className="flex items-center gap-2">
            <Repeat className="w-3.5 h-3.5 text-gray-500" />
            <button
              onClick={() => setShowTriHaulModal(true)}
              className="text-gray-600 font-medium hover:text-blue-600 transition-colors cursor-pointer"
            >
              TRI-HAUL (NO ROUTES)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-gray-500" />
            <button
              onClick={() => navigate('/market-conditions')}
              className="text-gray-600 font-medium hover:text-blue-600 transition-colors cursor-pointer"
            >
              MARKET CONDITIONS
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-gray-600 font-medium">LANEMAKERS</span>
          </div>
        </div>
      </div>

      {/* Table View */}
      {
        viewMode === 'table' && (
          <div className="bg-white rounded-b-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Load ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Origin → Destination
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Distance
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Equipment
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Load Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Length
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Pickup Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((load) => {
                    const rows = [
                      <tr
                        key={load.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setSelectedLoad(selectedLoad?.id === load.id ? null : load)}
                      >
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-medium text-blue-600">{load.id}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="text-sm text-gray-900 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-red-500" />
                                {load.origin}
                              </div>
                              <div className="text-sm text-gray-900 flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3 text-green-500" />
                                {load.destination}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{load.distance}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {load.equipment}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{load.loadType}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{load.length}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{load.weight}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{load.pickupDate}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{load.rate}</div>
                            <div className="text-xs text-gray-500">{load.ratePerMile}/mi</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                              title="View Details"
                              onClick={() => setSelectedLoad(selectedLoad?.id === load.id ? null : load)}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                              title="Save Load"
                              onClick={() => toast.success(`Load ${load.id} saved`)}
                            >
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button
                              className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                              onClick={() => toast.success(`Booking ${load.id}`)}
                            >
                              Book Now
                            </button>
                          </div>
                        </td>
                      </tr>
                    ];

                    if (selectedLoad?.id === load.id) {
                      rows.push(
                        <tr key={`${load.id}-details`}>
                          <td colSpan={11} className="px-0 py-0 bg-gray-50 border-t-2 border-blue-500">
                            <div className="px-6 py-6">
                              <div className="grid grid-cols-3 gap-6">
                                {/* Left Column */}
                                <div className="col-span-2 space-y-6">
                                  {/* Trip Section */}
                                  <div>
                                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Trip</h3>
                                    <div className="space-y-3">
                                      <div className="flex items-start gap-4">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                                        <div className="flex-1">
                                          <div className="font-semibold text-gray-900">{selectedLoad.origin}</div>
                                          <div className="text-sm text-gray-600 mt-0.5">{selectedLoad.pickupDate}</div>
                                          <div className="text-sm text-gray-600">0800-1600</div>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-4">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                                        <div className="flex-1">
                                          <div className="font-semibold text-gray-900">{selectedLoad.destination}</div>
                                          <div className="text-sm text-gray-600 mt-0.5">{selectedLoad.pickupDate}</div>
                                          <div className="text-sm text-gray-600">0630-1656</div>
                                        </div>
                                      </div>
                                    </div>
                                    <button className="mt-3 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                      <MapIcon className="w-4 h-4" />
                                      VIEW ROUTE
                                    </button>
                                  </div>

                                  {/* Equipment Section */}
                                  <div>
                                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Equipment</h3>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Load</span>
                                        <span className="font-medium text-gray-900">{selectedLoad.loadType}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Truck</span>
                                        <span className="font-medium text-gray-900">{selectedLoad.equipment}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Length</span>
                                        <span className="font-medium text-gray-900">{selectedLoad.length}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Weight</span>
                                        <span className="font-medium text-gray-900">{selectedLoad.weight}</span>
                                      </div>
                                      <div className="flex items-center justify-between col-span-2">
                                        <span className="text-gray-600">Commodity</span>
                                        <span className="font-medium text-gray-900">{selectedLoad.commodity}</span>
                                      </div>
                                      <div className="flex items-center justify-between col-span-2">
                                        <span className="text-gray-600">Reference ID</span>
                                        <span className="font-medium text-gray-900">{selectedLoad.id}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Market Rates Section */}
                                  <div>
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                      MARKET RATES <span className="text-gray-400">Powered by DAT iQ</span>
                                    </h3>

                                    {/* Spot Rate */}
                                    <div className="mt-3 mb-3">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-gray-700 uppercase">SPOT RATE</span>
                                        <a href="#" className="text-xs text-blue-600 hover:underline">RATEVIEW</a>
                                      </div>
                                      <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-gray-900">$2,152</span>
                                        <span className="text-lg text-gray-600">($2.92/mi)</span>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        0 - 60 / $2.34 / $2.34 / $2.34 / $2.34 / $3.15/mi
                                      </div>
                                      <div className="text-xs text-gray-500">Joint MKT | 7d average</div>
                                    </div>

                                    {/* Contract Rate */}
                                    <div className="mt-4">
                                      <div className="text-xs font-semibold text-gray-700 uppercase mb-2">CONTRACT RATE</div>
                                      <div className="flex items-start gap-2 p-3 bg-white rounded border border-gray-200">
                                        <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Contract Rates are not available for this subscription</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Comments Section */}
                                  <div>
                                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Comments</h3>
                                    <p className="text-sm text-gray-900">PLEASE ADVISE BEST RATE - PICKUP BY 4:00PM</p>
                                  </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                  {/* Rate Section */}
                                  <div>
                                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Rate</h3>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Total</span>
                                        <span className="text-lg font-bold text-gray-900">{selectedLoad.rate}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Trip</span>
                                        <span className="font-medium text-gray-900">{selectedLoad.distance.replace(',', '')}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Rate / mile</span>
                                        <span className="font-medium text-gray-900">{selectedLoad.ratePerMile}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Company Section */}
                                  <div>
                                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Company</h3>
                                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
                                      VIEW IN DIRECTORY
                                    </button>
                                  </div>

                                  {/* Mark As Dropdown */}
                                  <div>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                      <option>MARK AS...</option>
                                      <option>Booked</option>
                                      <option>In Transit</option>
                                      <option>Delivered</option>
                                      <option>Cancelled</option>
                                    </select>
                                  </div>

                                  {/* Load Resources Section */}
                                  <div>
                                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">LOAD RESOURCES</h3>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex items-start gap-2">
                                        <span className="text-gray-600">Factor with:</span>
                                        <div className="flex items-center gap-1">
                                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                          </svg>
                                          <span className="font-medium text-gray-900">OTB SOLUTIONS</span>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <span className="text-gray-600">Insurance:</span>
                                        <div className="space-y-1">
                                          <div className="flex items-center gap-1">
                                            <input type="radio" name="insurance" className="w-3 h-3" />
                                            <span className="font-medium text-gray-900">DAT ASSURANCE</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <input type="radio" name="insurance" className="w-3 h-3" />
                                            <span className="font-medium text-gray-900">PER LOAD INSURANCE</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    }

                    return rows;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      }

      {/* Map View */}
      {
        viewMode === 'map' && (
          <div className="bg-white rounded-b-lg border border-gray-200 p-6 shadow-sm">
            <div className="relative" style={{ height: '600px' }}>
              <ComposableMap
                projection="geoAlbersUsa"
                projectionConfig={{
                  scale: 1000,
                }}
                className="w-full h-full"
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#F3F4F6"
                        stroke="#E5E7EB"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: 'none' },
                          hover: { fill: '#E5E7EB', outline: 'none' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {filteredData.map((load) => (
                  <g key={load.id}>
                    <Line
                      from={load.originCoords as [number, number]}
                      to={load.destCoords as [number, number]}
                      stroke="#3B82F6"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeDasharray="4,2"
                    />
                    <Marker coordinates={load.originCoords as [number, number]}>
                      <circle r={5} fill="#EF4444" stroke="#FFFFFF" strokeWidth={2} />
                    </Marker>
                    <Marker coordinates={load.destCoords as [number, number]}>
                      <circle r={5} fill="#10B981" stroke="#FFFFFF" strokeWidth={2} />
                    </Marker>
                  </g>
                ))}
              </ComposableMap>
            </div>

            <div className="mt-4 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-600">Origin</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Destination</span>
              </div>
              <div className="text-gray-600">
                Total: <span className="font-medium text-gray-900">{filteredData.length}</span> loads
              </div>
            </div>
          </div>
        )
      }

      {/* Tri-Haul Modal */}
      {
        showTriHaulModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Top TriHaul™ Options</h2>
                <button
                  onClick={() => setShowTriHaulModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-5">
                {/* DIRECT ROUTE */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-xs font-semibold text-gray-500 tracking-wide">DIRECT ROUTE</div>
                    <div className="text-xs font-semibold text-gray-500 tracking-wide">AVG LINEHAUL</div>
                  </div>

                  <div className="flex items-start gap-4">
                    {/* Route Visualization */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2.5 h-2.5 rounded-sm bg-blue-600"></div>
                        <div className="border-t-2 border-dashed border-blue-400 flex-1"></div>
                        <div className="w-2.5 h-2.5 rounded-sm bg-blue-600"></div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="font-semibold text-gray-900">Chicago Mkt</div>
                        <div className="text-gray-600">716 mi <span className="ml-1.5 font-semibold text-gray-900">$2091.00</span></div>
                        <div className="font-semibold text-gray-900">Atlanta Mkt</div>
                      </div>
                    </div>

                    {/* AVG LINEHAUL Calculation */}
                    <div className="text-right min-w-[110px]">
                      <div className="text-xl font-bold text-gray-900">$2.53</div>
                      <div className="text-base text-gray-600 my-0">+</div>
                      <div className="text-xl font-bold text-gray-900">$0.39</div>
                      <div className="border-t-2 border-gray-300 my-1"></div>
                      <div className="text-xl font-bold text-gray-900">$2.92</div>
                      <div className="text-xs text-gray-500 mt-0.5">Total Rate</div>

                      <div className="mt-3 pt-2">
                        <div className="text-xs text-gray-600 mb-0.5">x <span className="font-semibold text-gray-900">716mi</span></div>
                        <div className="text-lg font-bold text-gray-900">$2090.72</div>
                        <div className="text-xs text-gray-500">Total Revenue</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROUTE THROUGH */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-xs font-semibold text-gray-500 tracking-wide">ROUTE THROUGH</div>
                    <div className="text-xs font-semibold text-gray-500 tracking-wide">AVG LINEHAUL</div>
                  </div>

                  <div className="flex items-start gap-4">
                    {/* Route Visualization */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2.5 h-2.5 rounded-sm bg-blue-600"></div>
                        <div className="border-t-2 border-dashed border-blue-400 flex-1"></div>
                        <div className="w-2.5 h-2.5 rounded-sm bg-gray-800"></div>
                        <div className="border-t-2 border-dashed border-blue-400 flex-1"></div>
                        <div className="w-2.5 h-2.5 rounded-sm bg-blue-600"></div>
                      </div>

                      {/* Route Options */}
                      <div className="space-y-0">
                        <div className="flex items-center justify-between text-xs py-1.5 bg-blue-50">
                          <div className="flex items-center gap-6 flex-1 px-2">
                            <div className="text-blue-600 w-14">313 mi</div>
                            <div className="text-blue-600 w-20">$1165.80</div>
                            <div className="font-semibold text-gray-900 text-center flex-1">Quincy, IL</div>
                            <div className="text-gray-600 w-14">692 mi</div>
                            <div className="text-gray-900 font-semibold w-20 text-right">$2577.42</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs py-1.5">
                          <div className="flex items-center gap-6 flex-1 px-2">
                            <div className="text-blue-600 w-14">210 mi</div>
                            <div className="text-blue-600 w-20">$787.34</div>
                            <div className="font-semibold text-gray-900 text-center flex-1">Taylorville, IL</div>
                            <div className="text-gray-600 w-14">578 mi</div>
                            <div className="text-gray-900 font-semibold w-20 text-right">$2167.05</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs py-1.5 bg-gray-50">
                          <div className="flex items-center gap-6 flex-1 px-2">
                            <div className="text-blue-600 w-14">342 mi</div>
                            <div className="text-blue-600 w-20">$1060.49</div>
                            <div className="font-semibold text-gray-900 text-center flex-1">Cleveland, OH</div>
                            <div className="text-gray-600 w-14">717 mi</div>
                            <div className="text-gray-900 font-semibold w-20 text-right">$2223.31</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs py-1.5">
                          <div className="flex items-center gap-6 flex-1 px-2">
                            <div className="text-blue-600 w-14">298 mi</div>
                            <div className="text-blue-600 w-20">$1037.26</div>
                            <div className="font-semibold text-gray-900 text-center flex-1">St Louis, MO</div>
                            <div className="text-gray-600 w-14">556 mi</div>
                            <div className="text-gray-900 font-semibold w-20 text-right">$1935.29</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs py-1.5 bg-gray-50">
                          <div className="flex items-center gap-6 flex-1 px-2">
                            <div className="text-blue-600 w-14">487 mi</div>
                            <div className="text-blue-600 w-20">$1546.14</div>
                            <div className="font-semibold text-gray-900 text-center flex-1">Charleston, WV</div>
                            <div className="text-gray-600 w-14">500 mi</div>
                            <div className="text-gray-900 font-semibold w-20 text-right">$1587.41</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AVG LINEHAUL Calculation */}
                    <div className="text-right min-w-[110px]">
                      <div className="text-xl font-bold text-gray-900">$3.33</div>
                      <div className="text-base text-gray-600 my-0">+</div>
                      <div className="text-xl font-bold text-gray-900">$0.39</div>
                      <div className="border-t-2 border-gray-300 my-1"></div>
                      <div className="text-xl font-bold text-gray-900">$3.72</div>
                      <div className="text-xs text-gray-500 mt-0.5">Total Rate</div>

                      <div className="mt-3 pt-2">
                        <div className="text-xs text-gray-600 mb-0.5">x <span className="font-semibold text-gray-900">1005mi</span></div>
                        <div className="text-lg font-bold text-gray-900">$3738.60</div>
                        <div className="text-xs text-gray-500">Total Revenue</div>
                        <div className="text-base font-bold text-green-600 mt-2">+$1647.88</div>
                        <div className="text-xs text-gray-500">Revenue Difference</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Disclaimer */}
                <div className="text-xs text-gray-500 pt-3 border-t border-gray-200 leading-relaxed">
                  *Range is the interquartile range, which excludes the lowest 25% and highest 25% of values received.<br />
                  Broker Spot market rates are aggregated by DAT Solutions from data supplied daily from actual transactions. <span className="text-blue-600 cursor-pointer hover:underline">Learn more about TriHaul</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
