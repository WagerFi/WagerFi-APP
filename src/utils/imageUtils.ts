/**
 * Checks if an image URL is valid by attempting to load the image
 * @param url The image URL to check
 * @returns A promise that resolves to true if the image loads successfully, false otherwise
 */
export const checkImageURL = (url: string | undefined): Promise<boolean> => {
  if (!url) return Promise.resolve(false);
  
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      resolve(true);
    };
    
    img.onerror = () => {
      resolve(false);
    };
    
    img.src = url;
  });
};

/**
 * Filter an array of objects with logo URLs, removing any with invalid logo URLs
 * @param items Array of objects with optional logo property
 * @returns Promise resolving to filtered array with only valid logos
 */
export const filterItemsWithValidLogos = async <T extends { logo?: string }>(items: T[]): Promise<T[]> => {
  const validItems: T[] = [];
  
  for (const item of items) {
    // Include items without logos (they'll use fallback icons)
    if (!item.logo) {
      validItems.push(item);
      continue;
    }
    
    // Check if the logo URL is valid
    const isLogoValid = await checkImageURL(item.logo);
    if (isLogoValid) {
      validItems.push(item);
    }
  }
  
  return validItems;
};