# coding=utf-8

# UrbanFootprint v1.5
# Copyright (C) 2016 Calthorpe Analytics
#
# This file is part of UrbanFootprint version 1.5
#
# UrbanFootprint is distributed under the terms of the GNU General
# Public License version 3, as published by the Free Software Foundation. This
# code is distributed WITHOUT ANY WARRANTY, without implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
# Public License v3 for more details; see <http://www.gnu.org/licenses/>.

from django.contrib.gis.db import models
from footprint.main.models.geospatial.feature import Feature

__author__ = 'calthorpe_analytics'


class CpadHoldings(Feature):
    agency_name = models.CharField(max_length=70, null=True, blank=True)
    county = models.CharField(max_length=15, null=True, blank=True)
    agency_lev = models.CharField(max_length=20, null=True, blank=True)
    mng_agency = models.CharField(max_length=70, null=True, blank=True)
    site_name = models.CharField(max_length=80, null=True, blank=True)
    city = models.CharField(max_length=30, null=True, blank=True)
    layer = models.CharField(max_length=50, null=True, blank=True)
    layer_scag = models.CharField(max_length=50, null=True, blank=True)
    scag_acres = models.DecimalField(max_digits=14, decimal_places=2, null=True)
    notes = models.CharField(max_length=1024, null=True, blank=True)


    class Meta(object):
        abstract = True
        app_label = 'main'
