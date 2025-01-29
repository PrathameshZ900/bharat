// import { Button } from "@chakra-ui/react";
// import axios from "axios";
// import { div } from "framer-motion/client";
// import { useEffect, useState } from "react";

// function Products() {
//     const [Data, setdata ] = useState([]);

//     const fetchData = async()=>{
//         try {
//             const response = await axios({
//                 url:"https://api.escuelajs.co/api/v1/products",
//                 method:"get",
//             } )
//             setdata(response.data);
//             console.log(Data);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     useEffect(()=>{
//         fetchData()
//     },[])

//     return (
//       <>
//        {Data.map((products)=>(
//         <div key={products.id}>
        
//         <div>
//             {/* <img src= {products.imges[0]} alt="" /> */}
//             <h1>{products.title}</h1>
//             {products.images.map((ele)=>( 
//                 <div key={ele}>
//                    <img src={ele} alt="" />
//                 </div>
//              ))}
//         </div>
        
//         </div>
//        ))}

        

//       </>
//     );
//   }
  
//   export default Products;  // Export default for the component
  

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard"; 
import { 
    SimpleGrid, Container, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb, 
    Box, Text, HStack, Button, VStack
} from "@chakra-ui/react"; 

function Products() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange, setPriceRange] = useState(1000);
    const [sortOrder, setSortOrder] = useState(""); // Sorting state

    // Fetch Products
    const fetchData = async () => {
        try {
            const response = await axios.get("https://api.escuelajs.co/api/v1/products");
            setData(response.data);
            setFilteredData(response.data);

            // Extract unique categories
            const uniqueCategories = [...new Set(response.data.map(product => product.category.name))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter and Sort Products
    useEffect(() => {
        let filtered = data;

        if (selectedCategory) {
            filtered = filtered.filter(product => product.category.name === selectedCategory);
        }

        filtered = filtered.filter(product => product.price <= priceRange);

        if (sortOrder === "lowToHigh") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "highToLow") {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredData(filtered);
    }, [selectedCategory, priceRange, sortOrder, data]);

    return (
        <Container maxW="7xl" py={10}>
            
            {/* Filters Section */}
            <VStack align="stretch" spacing={4} mb={6}>
                
                {/* Filter Row */}
                <HStack spacing={4} justify="space-between" flexWrap="wrap">
                    
                    {/* Category Filter */}
                    <Select 
                        placeholder="Filter by Category" 
                        onChange={(e) => setSelectedCategory(e.target.value)} 
                        maxW="250px"
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </Select>

                    {/* Price Range Filter */}
                    <Box>
                        <Text mb={2} fontWeight="bold">Price Range: ${priceRange}</Text>
                        <Slider 
                            min={0} 
                            max={1000} 
                            step={50} 
                            value={priceRange}
                            onChange={setPriceRange}
                            width="250px"
                        >
                            <SliderTrack bg="gray.200">
                                <SliderFilledTrack bg="blue.500" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} />
                        </Slider>
                    </Box>

                    {/* Price Sorting */}
                    <Select 
                        placeholder="Sort by Price" 
                        onChange={(e) => setSortOrder(e.target.value)}
                        maxW="200px"
                    >
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </Select>

                    {/* Reset Button */}
                    <Button onClick={() => { setSelectedCategory(""); setPriceRange(1000); setSortOrder(""); }} colorScheme="red">
                        Reset Filters
                    </Button>

                </HStack>
            </VStack>

            {/* Product Grid */}
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
                {filteredData.length > 0 ? (
                    filteredData.map((product) => <ProductCard key={product.id} product={product} />)
                ) : (
                    <Text fontSize="xl" color="gray.500">No products found.</Text>
                )}
            </SimpleGrid>
        </Container>
    );
}

export default Products;

