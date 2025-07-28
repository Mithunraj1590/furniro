import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './sizeGuide.module.scss';
import { Helmet } from 'react-helmet-async';

const SizeGuide = () => {
  const [activeCategory, setActiveCategory] = useState('sofas');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const categories = [
    { id: 'sofas', name: 'Sofas & Couches', icon: 'bi-couch' },
    { id: 'chairs', name: 'Chairs & Seating', icon: 'bi-chair' },
    { id: 'tables', name: 'Tables & Desks', icon: 'bi-table' },
    { id: 'beds', name: 'Beds & Mattresses', icon: 'bi-bed' },
    { id: 'storage', name: 'Storage & Cabinets', icon: 'bi-archive' }
  ];

  const sizeData = {
    sofas: {
      title: 'Sofa & Couch Sizing Guide',
      description: 'Find the perfect sofa size for your space with our comprehensive guide.',
      measurements: [
        { name: 'Small Sofa', width: '60-72"', depth: '32-36"', height: '32-36"', seats: '2-3 people' },
        { name: 'Medium Sofa', width: '72-84"', depth: '34-38"', height: '33-37"', seats: '3-4 people' },
        { name: 'Large Sofa', width: '84-96"', depth: '36-40"', height: '34-38"', seats: '4-5 people' },
        { name: 'Sectional', width: '96-120"', depth: '36-42"', height: '33-37"', seats: '5-8 people' }
      ],
      tips: [
        'Allow 18-24 inches of clearance around the sofa for comfortable movement',
        'For TV viewing, maintain a distance of 8-12 feet from the screen',
        'Consider the scale of your room - larger rooms can accommodate bigger sofas',
        'Measure your doorways and hallways to ensure delivery is possible'
      ]
    },
    chairs: {
      title: 'Chair & Seating Sizing Guide',
      description: 'Choose the right chair size for comfort and style.',
      measurements: [
        { name: 'Accent Chair', width: '28-32"', depth: '30-34"', height: '32-36"', seats: '1 person' },
        { name: 'Armchair', width: '32-36"', depth: '32-36"', height: '33-37"', seats: '1 person' },
        { name: 'Recliner', width: '36-40"', depth: '38-42"', height: '40-44"', seats: '1 person' },
        { name: 'Dining Chair', width: '18-22"', depth: '20-24"', height: '18-20"', seats: '1 person' }
      ],
      tips: [
        'Accent chairs should complement your sofa without overwhelming it',
        'Dining chairs need 24-30 inches of space per person for comfortable seating',
        'Recliners require additional space for the reclining mechanism',
        'Consider the height of your table when choosing dining chairs'
      ]
    },
    tables: {
      title: 'Table & Desk Sizing Guide',
      description: 'Select the perfect table size for your needs and space.',
      measurements: [
        { name: 'Coffee Table', width: '36-48"', depth: '20-24"', height: '16-18"', seats: 'N/A' },
        { name: 'Dining Table (4)', width: '36-44"', depth: '36-44"', height: '28-30"', seats: '4 people' },
        { name: 'Dining Table (6)', width: '60-72"', depth: '36-44"', height: '28-30"', seats: '6 people' },
        { name: 'Dining Table (8)', width: '72-84"', depth: '36-44"', height: '28-30"', seats: '8 people' }
      ],
      tips: [
        'Coffee tables should be 2-4 inches lower than your sofa seat height',
        'Allow 36-42 inches of clearance around dining tables for chairs and movement',
        'Round tables are great for smaller spaces and encourage conversation',
        'Consider the number of people you typically entertain when choosing table size'
      ]
    },
    beds: {
      title: 'Bed & Mattress Sizing Guide',
      description: 'Find the right bed size for your bedroom and sleeping needs.',
      measurements: [
        { name: 'Twin', width: '38"', depth: '75"', height: 'N/A', seats: '1 person' },
        { name: 'Full/Double', width: '54"', depth: '75"', height: 'N/A', seats: '1-2 people' },
        { name: 'Queen', width: '60"', depth: '80"', height: 'N/A', seats: '2 people' },
        { name: 'King', width: '76"', depth: '80"', height: 'N/A', seats: '2 people' }
      ],
      tips: [
        'Allow 24-36 inches of space on each side of the bed for comfortable movement',
        'Consider the height of your ceiling when choosing a bed frame',
        'Platform beds are lower to the ground than traditional bed frames',
        'Measure your room dimensions before purchasing to ensure proper fit'
      ]
    },
    storage: {
      title: 'Storage & Cabinet Sizing Guide',
      description: 'Choose storage solutions that fit your space and needs.',
      measurements: [
        { name: 'Bookshelf', width: '24-36"', depth: '12-16"', height: '60-84"', seats: 'N/A' },
        { name: 'Wardrobe', width: '36-48"', depth: '20-24"', height: '72-84"', seats: 'N/A' },
        { name: 'Chest of Drawers', width: '36-48"', depth: '18-22"', height: '32-36"', seats: 'N/A' },
        { name: 'Entertainment Center', width: '60-84"', depth: '18-24"', height: '60-72"', seats: 'N/A' }
      ],
      tips: [
        'Bookshelves should be anchored to the wall for safety',
        'Allow 24-36 inches of clearance in front of storage units for access',
        'Consider the weight capacity of your floor when choosing large storage pieces',
        'Measure your TV and components when selecting entertainment centers'
      ]
    }
  };

  const currentData = sizeData[activeCategory];

  return (
    <>
      <Helmet>
        <title>Size Guide | Ecom Store</title>
        <meta name="description" content="Find the perfect fit with Ecom Store's comprehensive size guide." />
        <link rel="canonical" href="/size-guide" />
      </Helmet>
      <div className={styles.sizeGuidePage}>
        <Breadcrumb />
        
        <motion.section 
          className={styles.heroSection}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container">
            <motion.h1 variants={itemVariants}>Size Guide</motion.h1>
            <motion.p variants={itemVariants}>
              Find the perfect fit for your space with our comprehensive furniture sizing guide.
            </motion.p>
          </div>
        </motion.section>

        <section className={styles.contentSection}>
          <div className="container">
            {/* Category Navigation */}
            <motion.div 
              className={styles.categoryNav}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>Select Category</motion.h2>
              <motion.div className={styles.categoryGrid} variants={itemVariants}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <i className={category.icon}></i>
                    <span>{category.name}</span>
                  </button>
                ))}
              </motion.div>
            </motion.div>

            {/* Size Information */}
            <motion.div 
              className={styles.sizeInfo}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={activeCategory}
            >
              <motion.h2 variants={itemVariants}>{currentData.title}</motion.h2>
              <motion.p variants={itemVariants} className={styles.description}>
                {currentData.description}
              </motion.p>

              {/* Size Table */}
              <motion.div className={styles.sizeTable} variants={itemVariants}>
                <div className={styles.tableHeader}>
                  <div className={styles.headerCell}>Size</div>
                  <div className={styles.headerCell}>Width</div>
                  <div className={styles.headerCell}>Depth</div>
                  <div className={styles.headerCell}>Height</div>
                  <div className={styles.headerCell}>Capacity</div>
                </div>
                {currentData.measurements.map((item, index) => (
                  <div key={index} className={styles.tableRow}>
                    <div className={styles.cell}>{item.name}</div>
                    <div className={styles.cell}>{item.width}</div>
                    <div className={styles.cell}>{item.depth}</div>
                    <div className={styles.cell}>{item.height}</div>
                    <div className={styles.cell}>{item.seats}</div>
                  </div>
                ))}
              </motion.div>

              {/* Tips Section */}
              <motion.div className={styles.tipsSection} variants={itemVariants}>
                <h3>Sizing Tips</h3>
                <ul>
                  {currentData.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* General Tips */}
            <motion.div 
              className={styles.generalTips}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>General Sizing Tips</motion.h2>
              <motion.div className={styles.tipsGrid} variants={itemVariants}>
                <div className={styles.tipCard}>
                  <i className="bi bi-rulers"></i>
                  <h4>Measure Your Space</h4>
                  <p>Always measure your room dimensions, doorways, and hallways before purchasing furniture.</p>
                </div>
                <div className={styles.tipCard}>
                  <i className="bi bi-arrows-move"></i>
                  <h4>Consider Traffic Flow</h4>
                  <p>Leave adequate space for comfortable movement around your furniture pieces.</p>
                </div>
                <div className={styles.tipCard}>
                  <i className="bi bi-lightbulb"></i>
                  <h4>Think About Function</h4>
                  <p>Consider how you'll use the space and choose furniture that supports your lifestyle.</p>
                </div>
                <div className={styles.tipCard}>
                  <i className="bi bi-palette"></i>
                  <h4>Scale Matters</h4>
                  <p>Ensure your furniture is proportional to your room size and other pieces.</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Measurement Tools */}
            <motion.div 
              className={styles.measurementTools}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>Measurement Tools</motion.h2>
              <motion.div className={styles.toolsGrid} variants={itemVariants}>
                <div className={styles.toolCard}>
                  <h4>Room Layout Planner</h4>
                  <p>Use our online room planner to visualize furniture placement before purchasing.</p>
                  <button className={styles.toolButton}>Try Room Planner</button>
                </div>
                <div className={styles.toolCard}>
                  <h4>Size Calculator</h4>
                  <p>Calculate the perfect furniture dimensions for your specific room size.</p>
                  <button className={styles.toolButton}>Use Calculator</button>
                </div>
                <div className={styles.toolCard}>
                  <h4>Virtual Staging</h4>
                  <p>See how furniture looks in your space with our virtual staging tool.</p>
                  <button className={styles.toolButton}>Start Staging</button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SizeGuide; 