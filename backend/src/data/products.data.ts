import { ProductCategory } from '../models/types.js';

export const PRODUCTS_CATALOG: ProductCategory[] = [
  {
    id: 'thermoplastic',
    name: 'Thermoplastic Multipurpose Hose',
    series: 'TM Series',
    shortDesc: 'Premium oil-resistant, high tensile yarn-reinforced hose engineered for aggressive chemical and hydraulic pneumatic transfer.',
    longDesc: 'Engineered with specialized thermoplastic polyurethane and polyamide compounds, reinforced with high tenacity synthetic polyester yarn. Delivers superior abrasion resistance, ozone endurance, and chemical inertness compared to conventional rubber hoses at 40% lower weight.',
    standard: 'IS 447 / ISO 1307 / DIN EN 854',
    reinforcement: 'High Tenacity Braided Synthetic Polyester Yarn',
    liningCover: 'Oil and chemical resistant modified thermoplastic alloy',
    tempRange: '-25°C to +80°C (-13°F to +176°F)',
    availableColors: ['Jet Black', 'Safety Blue', 'Safety Red', 'Industrial Yellow'],
    applications: [
      'Pneumatic high-volume airline feeds in automotive assembly lines',
      'Lubrication oil and mineral fuel transfer circuits',
      'Industrial chemical dosing and solvent conveyance',
      'Paint spraying equipment and airless compressor leads',
      'Robotic pneumatic arms requiring light weight and high flex life'
    ],
    keyAdvantages: [
      '40% lighter than standard rubber hoses for ergonomic handling',
      'Exceptional ozone, UV, and atmospheric weather resistance',
      'Smooth inner bore yields minimal pressure drop across long pipe runs',
      'Non-conductive electrical insulation characteristics'
    ],
    certifications: ['ISO 9001:2015', 'RoHS Compliant', 'REACH Certified', 'IS 447 Class 2'],
    mechSpecs: {
      tensile_lin: '10 N/mm²',
      tensile_cov: '14 N/mm²',
      elong_lin: '220%',
      elong_cov: '300%',
      adhesion: '≥ 2.5 kN/m'
    },
    specs: [
      { code: 'TM-04', od_mm: '11.5', od_in: '0.45"', id_mm: '6.3', id_in: '1/4"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '50', standardCoilLength: '100m / 200m' },
      { code: 'TM-06', od_mm: '13.0', od_in: '0.51"', id_mm: '8.0', id_in: '5/16"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '65', standardCoilLength: '100m' },
      { code: 'TM-08', od_mm: '16.5', od_in: '0.65"', id_mm: '10.0', id_in: '3/8"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '80', standardCoilLength: '100m' },
      { code: 'TM-12', od_mm: '19.0', od_in: '0.75"', id_mm: '12.5', id_in: '1/2"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '100', standardCoilLength: '50m / 100m' },
      { code: 'TM-16', od_mm: '23.5', od_in: '0.93"', id_mm: '16.0', id_in: '5/8"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '130', standardCoilLength: '50m' },
      { code: 'TM-25', od_mm: '32.0', od_in: '1.26"', id_mm: '25.0', id_in: '1"', wp_bar: '15', wp_psi: '218', bp_bar: '45', bp_psi: '653', bend_mm: '200', standardCoilLength: '30m / 50m' }
    ]
  },
  {
    id: 'air-water',
    name: 'Air / Water Hose',
    series: 'AW Series',
    shortDesc: 'Heavy-duty industrial air compressor and water discharge hose built for harsh construction, quarry, and workshop environments.',
    longDesc: 'Designed to deliver high volumetric flow rates for rugged site utilities, pneumatic machinery, and mining compressor discharge. Built with abrasion-resistant synthetic elastomer cover capable of withstanding rough dragging across gravel and concrete floors.',
    standard: 'IS 447 Type 1 / ISO 2398',
    reinforcement: 'High Tensile Synthetic Textile Yarn',
    liningCover: 'Weather, micro-crack, and abrasion resistant compounded polymer',
    tempRange: '-20°C to +75°C (-4°F to +167°F)',
    availableColors: ['Industrial Yellow', 'Jet Black', 'Forest Green'],
    applications: [
      'Pneumatic drilling rigs and tunneling equipment',
      'Heavy plant air supply manifolds and drop lines',
      'Construction dewatering and high-volume washdown',
      'Shipyard and foundry compressed air feeds'
    ],
    keyAdvantages: [
      'Pin-pricked outer cover prevents blistering from gas permeation',
      'Excellent kink resistance even under acute angle routing',
      'High resistance to oil mist present in compressed air streams'
    ],
    certifications: ['ISO 9001:2015', 'IS 447 Certified', 'Factory Batch Tested'],
    mechSpecs: {
      tensile_lin: '10 N/mm²',
      tensile_cov: '12 N/mm²',
      elong_lin: '200%',
      elong_cov: '280%',
      adhesion: '≥ 2.0 kN/m'
    },
    specs: [
      { code: 'AW-06', od_mm: '13.5', od_in: '0.53"', id_mm: '6.3', id_in: '1/4"', wp_bar: '16', wp_psi: '232', bp_bar: '48', bp_psi: '696', bend_mm: '55', standardCoilLength: '100m' },
      { code: 'AW-10', od_mm: '18.0', od_in: '0.71"', id_mm: '10.0', id_in: '3/8"', wp_bar: '14', wp_psi: '203', bp_bar: '42', bp_psi: '609', bend_mm: '85', standardCoilLength: '100m' },
      { code: 'AW-12', od_mm: '20.5', od_in: '0.81"', id_mm: '12.5', id_in: '1/2"', wp_bar: '12', wp_psi: '174', bp_bar: '36', bp_psi: '522', bend_mm: '100', standardCoilLength: '50m / 100m' },
      { code: 'AW-19', od_mm: '28.5', od_in: '1.12"', id_mm: '19.0', id_in: '3/4"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '150', standardCoilLength: '50m' },
      { code: 'AW-25', od_mm: '35.0', od_in: '1.38"', id_mm: '25.4', id_in: '1"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '190', standardCoilLength: '30m' },
      { code: 'AW-50', od_mm: '62.5', od_in: '2.46"', id_mm: '50.8', id_in: '2"', wp_bar: '8', wp_psi: '116', bp_bar: '24', bp_psi: '348', bend_mm: '350', standardCoilLength: '30m' }
    ]
  },
  {
    id: 'pvc-braided',
    name: 'PVC Braided Hose (Light & Heavy Duty)',
    series: 'PVC Series',
    shortDesc: 'Crystal-clear transparent hose with spiral cross-braid reinforcement for visual inspection of fluid transit.',
    longDesc: 'Manufactured with high-grade virgin PVC resin and food/chemical safe plasticizers. Crystal clear transparency allows instant visual confirmation of flow, air bubbles, and fluid cleanliness. Available in Light Duty (general water & air) and Heavy Duty (high pressure chemical and slurry pumping).',
    standard: 'IS 15265 / FDA 21 CFR 177.1950 Grade Option',
    reinforcement: 'Cross-braided high tenacity polyester yarn',
    liningCover: 'Virgin, glass-clear plasticized PVC',
    tempRange: '-10°C to +65°C (14°F to +149°F)',
    availableColors: ['Crystal Clear / Blue Tracer', 'Crystal Clear / Red Tracer'],
    applications: [
      'Coolant fluid recirculation lines in CNC machine tools',
      'Food, beverage, milk, and potable drinking water supply',
      'Chemical metering, laboratory equipment, and vacuum suction lines',
      'General factory compressed air with inline moisture visibility'
    ],
    keyAdvantages: [
      '100% transparent wall for immediate visual flow diagnosis',
      'Zero phthalate and non-toxic food grade formulations available',
      'Excellent flexibility and smooth flow characteristics'
    ],
    certifications: ['IS 15265 Type 2', 'RoHS', 'REACH', 'BPA Free'],
    mechSpecs: {
      tensile_lin: '12 N/mm²',
      tensile_cov: '12 N/mm²',
      elong_lin: '250%',
      elong_cov: '250%',
      adhesion: '≥ 1.8 kN/m'
    },
    specs: [
      { code: 'PVC-L06', od_mm: '10.0', od_in: '0.39"', id_mm: '6.0', id_in: '1/4"', wp_bar: '12', wp_psi: '174', bp_bar: '36', bp_psi: '522', bend_mm: '40', standardCoilLength: '100m' },
      { code: 'PVC-L10', od_mm: '15.0', od_in: '0.59"', id_mm: '10.0', id_in: '3/8"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '65', standardCoilLength: '100m' },
      { code: 'PVC-H08', od_mm: '14.5', od_in: '0.57"', id_mm: '8.0', id_in: '5/16"', wp_bar: '28', wp_psi: '406', bp_bar: '84', bp_psi: '1218', bend_mm: '60', standardCoilLength: '100m' },
      { code: 'PVC-H12', od_mm: '18.5', od_in: '0.73"', id_mm: '12.5', id_in: '1/2"', wp_bar: '24', wp_psi: '348', bp_bar: '72', bp_psi: '1044', bend_mm: '90', standardCoilLength: '50m' },
      { code: 'PVC-H19', od_mm: '27.0', od_in: '1.06"', id_mm: '19.0', id_in: '3/4"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '140', standardCoilLength: '50m' },
      { code: 'PVC-H50', od_mm: '62.0', od_in: '2.44"', id_mm: '50.0', id_in: '2"', wp_bar: '12', wp_psi: '174', bp_bar: '36', bp_psi: '522', bend_mm: '350', standardCoilLength: '30m' }
    ]
  },
  {
    id: 'pu-tubing',
    name: 'Polyurethane (PU) Tubing & Recoil Coils',
    series: 'PU Series',
    shortDesc: 'Ultra-flexible pneumatic tubing with high memory retention, 100% kink recovery, and push-in fitting compatibility.',
    longDesc: 'Extruded from 100% virgin ether-based or ester-based TPU elastomer. Provides industry-leading flexibility down to tight bend radiuses without pinching or flow restriction. High elastic memory makes it the benchmark for pneumatic recoil spiral assemblies in robotic workstations.',
    standard: 'ISO 14743 / DIN 73378',
    reinforcement: 'Unreinforced homogeneous TPU polymer matrix',
    liningCover: '100% Ether/Ester Polyurethane Resin',
    tempRange: '-40°C to +70°C (-40°F to +158°F)',
    availableColors: ['Electric Blue', 'Jet Black', 'Transparent Crystal', 'High-Vis Orange', 'Silver Grey'],
    applications: [
      'Pneumatic automation solenoid valves, cylinders, and logic manifolds',
      'Assembly line air screwdrivers, nut-runners, and torque tools',
      'Industrial robotic end-effectors and pick-and-place grippers',
      'Medical laboratory pneumatic controls and gas transport'
    ],
    keyAdvantages: [
      'Complete kink recovery with near-zero permanent deformation',
      'Precision external tolerance (+/- 0.05mm) for leak-free push-in couplings',
      'High hydrolytic stability and resistance to microbial attack'
    ],
    certifications: ['RoHS 3', 'REACH', 'UL94-HB Flame Class Option', 'ISO 9001'],
    mechSpecs: {
      tensile_lin: '35 N/mm²',
      tensile_cov: '35 N/mm²',
      elong_lin: '450%',
      elong_cov: '450%',
      adhesion: 'Monolithic'
    },
    specs: [
      { code: 'AMPU0425', od_mm: '4.0', od_in: '5/32"', id_mm: '2.5', id_in: '3/32"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '12', standardCoilLength: '100m', tolerance: '0.10', priceRoll: '₹1,450', priceMeter: '₹14.50' },
      { code: 'AMPU0604', od_mm: '6.0', od_in: '1/4"', id_mm: '4.0', id_in: '5/32"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '18', standardCoilLength: '100m', tolerance: '0.10', priceRoll: '₹2,100', priceMeter: '₹21.00' },
      { code: 'AMPU0805', od_mm: '8.0', od_in: '5/16"', id_mm: '5.0', id_in: '13/64"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '22', standardCoilLength: '100m', tolerance: '0.10', priceRoll: '₹3,400', priceMeter: '₹34.00' },
      { code: 'AMPU0855', od_mm: '8.0', od_in: '5/16"', id_mm: '5.5', id_in: '7/32"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '24', standardCoilLength: '100m', tolerance: '0.10', priceRoll: '₹3,300', priceMeter: '₹33.00' },
      { code: 'AMPU0806', od_mm: '8.0', od_in: '5/16"', id_mm: '6.0', id_in: '1/4"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '25', standardCoilLength: '100m', tolerance: '0.10', priceRoll: '₹3,000', priceMeter: '₹30.00' },
      { code: 'AMPU1065', od_mm: '10.0', od_in: '3/8"', id_mm: '6.5', id_in: '1/4"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '30', standardCoilLength: '100m', tolerance: '0.10', priceRoll: '₹5,400', priceMeter: '₹54.00' },
      { code: 'AMPU1008', od_mm: '10.0', od_in: '3/8"', id_mm: '8.0', id_in: '5/16"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '32', standardCoilLength: '100m', tolerance: '0.12', priceRoll: '₹4,500', priceMeter: '₹45.00' },
      { code: 'AMPU1208', od_mm: '12.0', od_in: '1/2"', id_mm: '8.0', id_in: '5/16"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '36', standardCoilLength: '100m', tolerance: '0.15', priceRoll: '₹7,200', priceMeter: '₹72.00' },
      { code: 'AMPU1209', od_mm: '12.0', od_in: '1/2"', id_mm: '9.0', id_in: '23/64"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '38', standardCoilLength: '100m', tolerance: '0.15', priceRoll: '₹6,200', priceMeter: '₹62.00' },
      { code: 'AMPU1210', od_mm: '12.0', od_in: '1/2"', id_mm: '10.0', id_in: '3/8"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '40', standardCoilLength: '100m', tolerance: '0.15', priceRoll: '₹5,100', priceMeter: '₹51.00' },
      { code: 'AMPU1410', od_mm: '14.0', od_in: '9/16"', id_mm: '10.0', id_in: '3/8"', wp_bar: '8', wp_psi: '116', bp_bar: '24', bp_psi: '348', bend_mm: '45', standardCoilLength: '100m', tolerance: '0.15', priceRoll: '₹9,500', priceMeter: '₹95.00' },
      { code: 'AMPU1612', od_mm: '16.0', od_in: '5/8"', id_mm: '12.0', id_in: '1/2"', wp_bar: '8', wp_psi: '116', bp_bar: '24', bp_psi: '348', bend_mm: '55', standardCoilLength: '100m', tolerance: '0.15', priceRoll: '₹11,500', priceMeter: '₹115.00' },
    ]
  },
  {
    id: 'welding',
    name: 'Thermoplastic Welding Hose (Oxy-Acetylene / LPG)',
    series: 'WH Series',
    shortDesc: 'Certified dual and single flame-retardant welding hoses for oxygen, acetylene, and LPG cutting torches.',
    longDesc: 'Formulated with flame retardant thermoplastic compounds that resist slag spatter, burning sparks, and torch backfires. Meets and exceeds IS 447 safety standards for flammable industrial gas conveyance with distinct color coding (Blue for Oxygen, Red for Fuel/Acetylene, Orange for LPG).',
    standard: 'IS 447 / ISO 3821 (EN 559)',
    reinforcement: 'High Tensile Synthetic Braided Yarn',
    liningCover: 'Non-blooming, anti-spark flame retardant polymer',
    tempRange: '-25°C to +70°C (-13°F to +158°F)',
    availableColors: ['Oxygen Blue', 'Acetylene Red', 'LPG Orange', 'Twin Bonded Blue/Red'],
    applications: [
      'Oxy-fuel gas cutting, welding, and brazing torches',
      'Structural fabrication yards and ship breaking facilities',
      'Automotive body repair workshops and metal engineering',
      'Steel plant maintenance and high temperature brazing'
    ],
    keyAdvantages: [
      'Resists ignition and burn-through from hot molten metal sparks',
      'Twin-line vulcanized bonding prevents hose tangling and field hazards',
      'Strict low gas permeation rate prevents flammable accumulation in workshops'
    ],
    certifications: ['IS 447 Certified', 'ISO 3821 Compliant', 'Chief Controller of Explosives Safety Tested'],
    mechSpecs: {
      tensile_lin: '11 N/mm²',
      tensile_cov: '13 N/mm²',
      elong_lin: '210%',
      elong_cov: '290%',
      adhesion: '≥ 2.2 kN/m'
    },
    specs: [
      { code: 'WH-05', od_mm: '9.5', od_in: '3/8"', id_mm: '5.0', id_in: '3/16"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '55', standardCoilLength: '100m' },
      { code: 'WH-06', od_mm: '11.5', od_in: '7/16"', id_mm: '6.3', id_in: '1/4"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '70', standardCoilLength: '100m' },
      { code: 'WH-08', od_mm: '13.0', od_in: '1/2"', id_mm: '8.0', id_in: '5/16"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '80', standardCoilLength: '100m' }
    ]
  },
  {
    id: 'fire-reel',
    name: 'Fire Hose Reel Hose',
    series: 'FH Series',
    shortDesc: 'Certified high-pressure semi-rigid fire fighting hose for building reels and municipal emergency units.',
    longDesc: 'Specially engineered semi-rigid fire hose reel line designed to retain circular cross-section during pressurized water discharge even while wound on the reel hub. Formulated with UV inhibitors and flame retardants to guarantee immediate deployment readiness during emergency fires.',
    standard: 'IS 884 / EN 671-1 / ISO 14557',
    reinforcement: 'High Tenacity Braided Textile Jacket',
    liningCover: 'Abrasion, ozone, and flame retardant red elastomer',
    tempRange: '-20°C to +65°C (-4°F to +149°F)',
    availableColors: ['Fire Engine Signal Red'],
    applications: [
      'Commercial building fire reel cabinets and risers',
      'Industrial chemical warehouse hydrant points',
      'Airport hangar and oil terminal safety stations',
      'Municipal fire rescue emergency rapid-attack lines'
    ],
    keyAdvantages: [
      'Semi-rigid circular profile allows instantaneous water delivery without unrolling',
      'Ultra-high burst rating (up to 48 Bar) exceeds stringent safety building codes',
      'Zero maintenance required; will not harden or crack over multi-year standby'
    ],
    certifications: ['IS 884 Fire Standard Approved', 'EN 671-1 Compliant', 'CE Certified'],
    mechSpecs: {
      tensile_lin: '12 N/mm²',
      tensile_cov: '14 N/mm²',
      elong_lin: '200%',
      elong_cov: '260%',
      adhesion: '≥ 2.5 kN/m'
    },
    specs: [
      { code: 'FH-19', od_mm: '28.0', od_in: '1.10"', id_mm: '19.0', id_in: '3/4"', wp_bar: '12', wp_psi: '174', bp_bar: '48', bp_psi: '696', bend_mm: '150', standardCoilLength: '30m / 36m' },
      { code: 'FH-25', od_mm: '35.0', od_in: '1.38"', id_mm: '25.4', id_in: '1"', wp_bar: '12', wp_psi: '174', bp_bar: '48', bp_psi: '696', bend_mm: '190', standardCoilLength: '30m / 36m' },
      { code: 'FH-32', od_mm: '44.0', od_in: '1.73"', id_mm: '32.0', id_in: '1¼"', wp_bar: '10', wp_psi: '145', bp_bar: '40', bp_psi: '580', bend_mm: '230', standardCoilLength: '30m' }
    ]
  }
];
