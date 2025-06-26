import { MrzData, Person } from '../types';

export const parseMrzText = (text: string): MrzData | null => {
  try {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    let documentNumber: string | null = null;
    let firstName: string | null = null;
    let lastName: string | null = null;
    let dateOfBirth: string | null = null;
    
    const mrzLines: string[] = lines.filter(line => 
      line.includes('IDARG') || 
      line.includes('ARG<<') || 
      line.match(/\d{6}[MF]/) || 
      line.includes('<<')
    );
    
    for (const line of lines) {
      if (line.includes('CUIL:')) {
        const cuilMatch = line.match(/([0-9]{2})-([0-9]{7,8})-([0-9])/);
        if (cuilMatch) {
          documentNumber = cuilMatch[2];
          break;
        }
      }
    }
    
    for (const line of lines) {
      if (line.includes('IDARG')) {
        const idMatch = line.match(/IDARG(\d{8})/i);
        if (idMatch) {
          documentNumber = idMatch[1];
          break;
        }
      }
    }
    
    for (const line of lines) {
      if (line.includes('<<') && line.endsWith('<<<')) {
        const parts = line.split('<<');
        if (parts.length >= 2) {
          lastName = parts[0].trim();
          const namesPart = parts.slice(1).join('');
          const names = namesPart.split('<').filter(n => n && !n.endsWith('<<<'));
          firstName = names.join(' ');
          
          lastName = lastName.replace(/[^A-Za-z]/g, '');
          firstName = firstName.replace(/[^A-Za-z\s]/g, '');
          break;
        }
      }
    }
    
    if (!firstName || !lastName) {
      const nameLine = mrzLines.find(line => line.includes('<<') && line.endsWith('<<<'));
      if (nameLine) {
        const nameMatch = nameLine.match(/([A-Z0-9]+)<<([A-Z0-9<]+)<<</);
        if (nameMatch) {
          lastName = nameMatch[1].replace(/[^A-Za-z]/g, '');
          const namesRaw = nameMatch[2];
          firstName = namesRaw.split('<').filter(Boolean).join(' ').replace(/[^A-Za-z\s]/g, '');
        }
      }
    }
    
    const cleanLines = lines.map(line => line.replace(/\s+/g, ''));
    
    const dateLines = cleanLines.filter(line => 
      line.includes('ARG') && 
      /\d{6}[MF]/.test(line)
    );
    
    if (dateLines.length > 0) {
      const dateLine = dateLines[0];
      const digitMatches = dateLine.match(/(\d{6})/);
      
      if (digitMatches && digitMatches[1]) {
        const firstSixDigits = digitMatches[1];
        const year = firstSixDigits.substring(0, 2);
        const month = firstSixDigits.substring(2, 4);
        const day = firstSixDigits.substring(4, 6);
        
        const currentYear = new Date().getFullYear() % 100;
        const fullYear = parseInt(year) > currentYear ? `19${year}` : `20${year}`;
        
        dateOfBirth = `${day}-${month}-${fullYear}`;
      }
    }
    
    if (!dateOfBirth) {
      for (const line of lines) {
        const dateMatch = line.match(/(\d{2})(\d{2})(\d{2})[MF]/i);
        if (dateMatch) {
          const year = dateMatch[1];
          const month = dateMatch[2];
          const day = dateMatch[3];
          
          const currentYear = new Date().getFullYear() % 100;
          const fullYear = parseInt(year) > currentYear ? `19${year}` : `20${year}`;
          
          dateOfBirth = `${day}-${month}-${fullYear}`;
          break;
        }
      }
    }
    
    if (!firstName || !lastName) {
      const nameLines = mrzLines.filter(line => line.includes('<<'));
      if (nameLines.length > 0) {
        const lastNameLine = nameLines[nameLines.length - 1];
        const nameMatch = lastNameLine.match(/([A-Z0-9]+)<<([A-Z0-9<]+)/i);
        if (nameMatch) {
          lastName = nameMatch[1].replace(/[^A-Za-z]/g, '');
          const firstNameParts = nameMatch[2].split('<').filter(part => part.length > 0);
          firstName = firstNameParts.join(' ').replace(/[^A-Za-z\s]/g, '');
        }
      }
    }
    
    if (!documentNumber) {
      return null;
    }
    
    return {
      documentNumber: documentNumber,
      firstName: firstName || '',
      lastName: lastName || '',
      dateOfBirth: dateOfBirth || '',
      rawText: text
    };
  } catch (error) {
    return null;
  }
};

export const isAdult = (dateOfBirth: string): boolean => {
  try {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 18;
  } catch (error) {
    return false;
  }
};

export const mrzDataToPerson = (mrzData: MrzData): Person => {
  return {
    dni: mrzData.documentNumber,
    firstName: mrzData.firstName,
    lastName: mrzData.lastName,
    dateOfBirth: mrzData.dateOfBirth,
    isAdult: isAdult(mrzData.dateOfBirth)
  };
};
