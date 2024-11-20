export interface Menu {
    menuId: number;        
    name: string;          
    description?: string;  
    category?: string;    
    price: number;        
    availability: boolean; 
    createdAt?: Date; 
  }
  