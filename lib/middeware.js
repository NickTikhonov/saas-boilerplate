import { getUserOrgs } from '@/lib/server/authorization';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

// Checks for valid authentication
// Returns .userOrgs on the request object
export function withAuth(handler) {
  const wrapped = async (req) => {
    try {
      const session = await getServerSession();
      if (!session || !session.user) {
        return new NextResponse('Unauthorized request', { status: 401 })
      }

      let orgs
      orgs = await getUserOrgs(session.user.email);
      req.userOrgs = orgs;

      return handler(req)
    } catch(e) {
      console.log('Error in withAuth middleware:', e);
      return new NextResponse('Oops - something bad has occured', { status: 500 })
    }
  }

  return wrapped
}

export function withOrg(handler) {
  const wrapped = async (req) => {
    try {
      if (!req.userOrgs) {
        return new NextResponse('Middleware incorrectly wired', { status: 500 })
      }

      const orgId = req.nextUrl.searchParams.get("orgId")
      if (!orgId) {
        return new NextResponse('Missing required "orgId" parameter.', { status: 400 });
      }

      const org = req.userOrgs.find(org => org.slug === orgId)
      if (!org) {
        return new NextResponse('Unauthorized request.', { status: 401 });
      }

      req.org = org
      return handler(req)
    } catch(e) {
      console.log('Error in withOrg middleware:', e);
      return new NextResponse('Oops - something bad has occured', { status: 500 })
    }
  }

  return wrapped
}

import Ajv from 'ajv';

export function withSearchParams(params, handler) {
  const ajv = new Ajv();

  const buildSchema = (params) => {
    let required = []
    let newParams = {}

    for (const [key, value] of Object.entries(params)) {
      if (value.required) {
        required.push(key)
      }

      const newValue = {...value}
      delete newValue.required
      newParams[key] = newValue
    }

    const schema = {
      type: 'object',
      properties: newParams,
      required: required,
      additionalProperties: true,
    };
    return schema
  }

  const wrapped = async (req) => {
    try {
      const schema = buildSchema(params)
      let paramsObj = {};
      for(let pair of req.nextUrl.searchParams.entries()) {
         paramsObj[pair[0]] = pair[1]; 
      }
      const valid = ajv.validate(schema, paramsObj)
      if (!valid) {
        return new NextResponse('Invalid query parameters.', { status: 400 });
      }
      req.params = paramsObj

      return handler(req)
    } catch(e) {
      console.log('Error in withSchema middleware:', e);
      return new NextResponse('Oops - something bad has occured', { status: 500 })
    }
  }

  return wrapped
}
