import { Request, Response } from 'express';
import { PRODUCTS_CATALOG } from '../data/products.data.js';

export const getAllProducts = (req: Request, res: Response) => {
  res.json({
    success: true,
    count: PRODUCTS_CATALOG.length,
    data: PRODUCTS_CATALOG
  });
};

export const getProductById = (req: Request, res: Response) => {
  const { id } = req.params;
  const product = PRODUCTS_CATALOG.find(p => p.id === id || p.series.toLowerCase() === id.toLowerCase());

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product category '${id}' not found`
    });
  }

  res.json({
    success: true,
    data: product
  });
};

export const searchProducts = (req: Request, res: Response) => {
  const query = (req.query.q as string || '').toLowerCase().trim();
  const minPressure = parseFloat(req.query.minPressure as string || '0');

  if (!query && !minPressure) {
    return res.json({
      success: true,
      count: PRODUCTS_CATALOG.length,
      data: PRODUCTS_CATALOG
    });
  }

  const results = PRODUCTS_CATALOG.map(cat => {
    const matchingSpecs = cat.specs.filter(s => {
      const codeMatch = s.code.toLowerCase().includes(query);
      const idMatch = s.id_mm.includes(query) || s.id_in.includes(query);
      const odMatch = s.od_mm.includes(query);
      const pressureMatch = minPressure ? parseFloat(s.wp_bar) >= minPressure : true;

      return (codeMatch || idMatch || odMatch || !query) && pressureMatch;
    });

    const categoryMatch = cat.name.toLowerCase().includes(query) ||
                          cat.series.toLowerCase().includes(query) ||
                          cat.applications.some(a => a.toLowerCase().includes(query));

    if (categoryMatch || matchingSpecs.length > 0) {
      return {
        ...cat,
        specs: matchingSpecs.length > 0 ? matchingSpecs : cat.specs
      };
    }
    return null;
  }).filter(Boolean);

  res.json({
    success: true,
    count: results.length,
    data: results
  });
};
