
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

from footprint.main.managers.geo_inheritance_manager import GeoInheritanceManager
from footprint.main.models.built_form.client_farmland_definition import ClientFarmlandDefinition

__author__ = 'calthorpe_analytics'

from django.db import models

class ScagDmFarmlandDefinition(ClientFarmlandDefinition):
    objects = GeoInheritanceManager()
    farmland_description = models.CharField(max_length=100, null=True, blank=True)
    farmland_type = models.CharField(max_length=100, null=True, blank=True)
    farmland_code = models.CharField(max_length=10, null=True, blank=True)

    @property
    def label(self):
        return self.farmland_description

    class Meta(object):
        abstract = False
        app_label = 'main'
